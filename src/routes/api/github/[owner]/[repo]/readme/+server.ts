import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { compile, escapeSvelte } from 'mdsvex';
import { createHighlighter as getHighlighter } from 'shiki';

let highlighterInstance: Awaited<ReturnType<typeof getHighlighter>> | null = null;

async function getCachedHighlighter() {
    if (!highlighterInstance) {
        highlighterInstance = await getHighlighter({
            themes: ['dark-plus'],
            langs: ['javascript', 'typescript', 'go', 'svelte', 'html', 'css', 'json', 'bash', 'c', 'cpp', 'python', 'shell']
        });
    }
    return highlighterInstance;
}

export const GET: RequestHandler = async ({ params, url }) => {
    const { owner, repo } = params;
    const path = url.searchParams.get('path') || 'README.md';
    const branch = url.searchParams.get('branch') || 'master'; // Default to master, or could check main

    // Try master first, then main if 404? 
    // GitHub usually redirects or raw content is available. 
    // Usually fetching from raw.githubusercontent.com is best.

    const fetchFromBranch = async (b: string) => {
        const targetUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${b}/${path}`;
        const res = await fetch(targetUrl);
        return res;
    };

    let response = await fetchFromBranch(branch);

    // Simple fallback if default 'master' fails, try 'main'
    if (!response.ok && branch === 'master') {
        response = await fetchFromBranch('main');
    }

    if (!response.ok) {
        return new Response(`# Error fetching README\n\nCould not fetch README from ${owner}/${repo}`, { status: 404 });
    }

    const text = await response.text();

    // Compile using mdsvex
    try {
        const highlighter = await getCachedHighlighter();

        const compiled = await compile(text, {
            highlight: {
                highlighter: async (code, lang) => {
                    const html = highlighter.codeToHtml(code, { lang: lang || 'text', theme: 'dark-plus' });
                    return escapeSvelte(html);
                }
            }
        });

        let code = compiled?.code || '';

        // Remove script/style tags
        code = code.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
        code = code.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');

        // Unwrap {@html `...`}
        // Pattern matches: {@html ` matches literal {@html `
        // ([\s\S]*?) matches any character non-greedy
        // `} matches literal `}
        code = code.replace(/{@html `([\s\S]*?)`}/g, '$1');

        return new Response(JSON.stringify({ code: code, raw: text }));
    } catch (e) {
        console.error('Mdsvex compile error', e);
        return new Response(JSON.stringify({ code: null, raw: text, error: 'Compile failed' }));
    }
};
