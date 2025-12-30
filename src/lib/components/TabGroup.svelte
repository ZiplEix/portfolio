<script lang="ts">
    import {
        openFiles,
        activeFileId,
        files,
        closeFile,
        openFile,
    } from "$lib/store";
    import { File as FileIcon, X } from "lucide-svelte";

    let currentOpenFiles = $state($openFiles);
    let currentActiveFileId = $state($activeFileId);
    let allFiles = $state($files);

    openFiles.subscribe((v) => (currentOpenFiles = v));
    activeFileId.subscribe((v) => (currentActiveFileId = v));
    files.subscribe((v) => (allFiles = v));

    function handleClose(e: MouseEvent, id: string) {
        e.stopPropagation();
        closeFile(id);
    }
</script>

<div
    class="bg-vscode-bg-dark flex border-b border-vscode-border overflow-x-auto no-scrollbar"
>
    {#each currentOpenFiles as fileId}
        {@const file = allFiles[fileId]}
        {#if file}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div
                class="group flex items-center gap-2 px-3 py-2 text-sm border-r border-vscode-border min-w-fit cursor-pointer select-none
            {currentActiveFileId === fileId
                    ? 'bg-vscode-tab-active text-white border-t-2 border-t-vscode-blue'
                    : 'bg-vscode-tab-inactive text-vscode-text border-t-2 border-t-transparent hover:bg-vscode-bg-dark'}"
                role="button"
                tabindex="0"
                onclick={() => openFile(fileId)}
            >
                <span class="flex items-center gap-1.5">
                    <FileIcon size={14} class="text-vscode-blue" />
                    {file.name}
                </span>
                <span
                    class="rounded-md hover:bg-gray-600 p-0.5 opacity-0 group-hover:opacity-100 {currentActiveFileId ===
                    fileId
                        ? 'opacity-100'
                        : ''}"
                    onclick={(e) => handleClose(e, fileId)}
                    role="button"
                    tabindex="0"
                >
                    <X size={14} />
                </span>
            </div>
        {/if}
    {/each}
</div>
