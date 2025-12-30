import { writable, type Writable } from 'svelte/store';

export type FileType = 'file' | 'folder';

export interface File {
    id: string;
    name: string;
    type: FileType;
    content?: string; // For markdown/text content
    parentId?: string;
    children?: string[]; // IDs of children if folder
    icon?: string;
    description?: string; // For projects
    url?: string; // For external links
    language?: string;
    stars?: number;
    owner?: string; // For GitHub fetch
    repo?: string;
    readmePath?: string;
    loaded?: boolean; // To track if dynamic content is loaded
}

// Initial File System
const initialFiles: Record<string, File> = {
    root: { id: 'root', name: 'PORTFOLIO', type: 'folder', children: ['about', 'projects-folder', 'contact-folder'] },
    about: {
        id: 'about',
        name: 'about-me.md',
        type: 'file',
        parentId: 'root',
        content: `
# About Me

Hi, I'm Baptiste.

I am a developer passionate about open source, data visualization, and creative coding.
        `
    },
    'projects-folder': { id: 'projects-folder', name: 'projects', type: 'folder', parentId: 'root', children: [] },
    'contact-folder': { id: 'contact-folder', name: 'contact', type: 'folder', parentId: 'root', children: ['github', 'email'] },
    'github': { id: 'github', name: 'github.json', type: 'file', parentId: 'contact-folder', content: '{ "url": "https://github.com/baptiste" }' },
    'email': { id: 'email', name: 'email.txt', type: 'file', parentId: 'contact-folder', content: 'Use the contact form or reach me at my email.' }
};

import projectsData from './data/projects.json';

// Populate projects
projectsData.forEach((p) => {
    const fileId = `project-${p.id}`;
    // Initial content is a loading stub or generic info
    const initialContent = `# ${p.name}\n\nLoading README from GitHub...\n\n${p.description}`;

    initialFiles[fileId] = {
        id: fileId,
        name: `${p.name}.md`,
        type: 'file',
        parentId: 'projects-folder',
        content: initialContent,
        description: p.description,
        url: p.url,
        language: p.language,
        stars: p.stars,
        owner: p.owner,
        repo: p.repo,
        readmePath: p.readmePath,
        loaded: false
    };
    initialFiles['projects-folder'].children?.push(fileId);
});

export const files = writable(initialFiles);
export const activeFileId = writable<string | null>('about');
export const openFiles = writable<string[]>(['about']);
export const sidebarVisible = writable(true);

export function toggleSidebar() {
    sidebarVisible.update(v => !v);
}

export async function fetchFileContent(file: File) {
    if (file.loaded || !file.owner || !file.repo) return;

    try {
        const pathParam = file.readmePath ? `?path=${file.readmePath}` : '';
        const res = await fetch(`/api/github/${file.owner}/${file.repo}/readme${pathParam}`);
        if (res.ok) {
            const data = await res.json();
            // mdsvex returns a Svelte component source.
            // We want to extract the HTML part.
            // A simple way is to remove <script module>...</script> and <script>...</script> blocks.
            // And also <style>...</style> if any.
            let content = data.code || data.raw;
            if (data.code) {
                // Remove script tags
                content = content.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
                content = content.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');
            }

            files.update(fs => {
                if (fs[file.id]) {
                    fs[file.id].content = content;
                    fs[file.id].loaded = true;
                }
                return fs;
            });
        } else {
            files.update(fs => {
                if (fs[file.id]) {
                    fs[file.id].content = `# Error\n\nFailed to load README.`;
                    fs[file.id].loaded = true;
                }
                return fs;
            });
        }
    } catch (e) {
        console.error("Failed to fetch README", e);
    }
}

export function openFile(id: string) {
    activeFileId.set(id);
    openFiles.update(files => {
        if (!files.includes(id)) {
            return [...files, id];
        }
        return files;
    });

    // Check if we need to fetch content
    // We need to access the file from the store value. 
    // Since we are inside a function, we can't easily get the store value without subscribing.
    // Ideally components call fetch, or we trust the component to react to 'loaded: false'
    // But let's trigger it here if possible, or exposing the fetch function is enough.
}

export function closeFile(id: string) {
    openFiles.update(files => {
        const newFiles = files.filter(f => f !== id);
        return newFiles;
    });
    activeFileId.update(active => {
        if (active === id) {
            return null;
        }
        return active;
    });
}
