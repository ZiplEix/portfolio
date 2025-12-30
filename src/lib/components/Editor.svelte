<script lang="ts">
    import { activeFileId, files, fetchFileContent } from "$lib/store";
    import { onMount, tick } from "svelte";

    let currentActiveFileId = $state($activeFileId);
    let allFiles = $state($files);

    activeFileId.subscribe((v) => (currentActiveFileId = v));
    files.subscribe((v) => (allFiles = v));

    $effect(() => {
        if (currentActiveFileId && allFiles[currentActiveFileId]) {
            const file = allFiles[currentActiveFileId];
            if (file.type === "file" && !file.loaded && file.owner) {
                fetchFileContent(file);
            }
        }
    });

    let content = $derived(
        currentActiveFileId && allFiles[currentActiveFileId]
            ? allFiles[currentActiveFileId].content
            : "",
    );
</script>

<div
    class="h-full bg-vscode-bg-dark text-vscode-text p-8 overflow-y-auto font-sans leading-relaxed relative"
>
    {#if currentActiveFileId}
        {#if allFiles[currentActiveFileId]?.url}
            <div class="absolute top-4 right-8 z-10">
                <a
                    href={allFiles[currentActiveFileId].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 bg-[#0e639c] hover:bg-[#1177bb] text-white px-3 py-1.5 rounded text-sm transition-colors font-medium no-underline shadow-md"
                >
                    <!-- GitHub Icon -->
                    <svg
                        height="16"
                        width="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                    >
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        ></path>
                    </svg>
                    View on GitHub
                </a>
            </div>
        {/if}
        <div class="markdown-body">
            {@html content}
        </div>
    {:else}
        <div class="flex items-center justify-center h-full text-zinc-600">
            <div class="text-center">
                <p class="text-2xl font-bold text-gray-700 mb-2">
                    VS Code Portfolio
                </p>
                <p>Select a file to view</p>
            </div>
        </div>
    {/if}
</div>
