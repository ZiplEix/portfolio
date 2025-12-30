<script lang="ts">
    import { files, openFile, type File } from "$lib/store";
    import { slide } from "svelte/transition";
    import {
        ChevronRight,
        ChevronDown,
        Folder,
        File as FileIcon,
        FolderOpen,
        MoreHorizontal,
    } from "lucide-svelte";

    let fileSystem = $state($files);

    // Subscribe to store updates
    files.subscribe((value) => {
        fileSystem = value;
    });

    let collapsedFolders = $state<Record<string, boolean>>({
        root: false,
        "projects-folder": false,
        "contact-folder": false,
    });

    function toggleFolder(id: string) {
        collapsedFolders[id] = !collapsedFolders[id];
    }

    function handleFileClick(file: File) {
        if (file.type === "folder") {
            toggleFolder(file.id);
        } else {
            openFile(file.id);
        }
    }
</script>

<div
    class="h-full bg-vscode-sidebar text-vscode-text flex flex-col text-sm border-r border-vscode-border select-none overflow-y-auto"
>
    <div
        class="p-2 text-xs font-bold tracking-wide uppercase flex items-center justify-between"
    >
        <span>Explorer</span>
        <div class="flex gap-1">
            <MoreHorizontal size={16} class="cursor-pointer hover:text-white" />
        </div>
    </div>

    <div class="flex-1">
        {#snippet FileTree(fileId: string, depth: number)}
            {@const file = fileSystem[fileId]}
            {#if file}
                <div
                    class="flex items-center cursor-pointer hover:bg-vscode-hover px-2 py-1"
                    style="padding-left: {depth * 12 + 8}px"
                    onclick={() => handleFileClick(file)}
                    role="button"
                    tabindex="0"
                    onkeydown={(e) =>
                        e.key === "Enter" && handleFileClick(file)}
                >
                    {#if file.type === "folder"}
                        <span class="mr-1 flex justify-center items-center w-4">
                            {#if collapsedFolders[file.id]}
                                <ChevronRight size={16} />
                            {:else}
                                <ChevronDown size={16} />
                            {/if}
                        </span>
                        <span class="mr-1.5 text-blue-400">
                            {#if collapsedFolders[file.id]}
                                <Folder size={16} />
                            {:else}
                                <FolderOpen size={16} />
                            {/if}
                        </span>
                        <span class="font-semibold text-xs truncate"
                            >{file.name.toUpperCase()}</span
                        >
                    {:else}
                        <span class="mr-1 w-4"></span>
                        <span class="mr-1.5 text-vscode-text">
                            <FileIcon size={16} />
                        </span>
                        <span class="truncate">{file.name}</span>
                    {/if}
                </div>

                {#if file.type === "folder" && !collapsedFolders[file.id] && file.children}
                    <div>
                        {#each file.children as childId}
                            {@render FileTree(childId, depth + 1)}
                        {/each}
                    </div>
                {/if}
            {/if}
        {/snippet}

        <!-- Start with Root Children to avoid showing ROOT folder itself if desired, or show root -->
        <!-- VS Code usually shows "PROJECT NAME" as root header -->

        <div
            class="font-bold text-xs pl-2 py-1 flex items-center cursor-pointer hover:bg-vscode-hover"
            onclick={() => toggleFolder("root")}
            role="button"
            tabindex="0"
            onkeydown={(e) => e.key === "Enter" && toggleFolder("root")}
        >
            <span class="mr-1 flex justify-center items-center w-4">
                {#if collapsedFolders["root"]}
                    <ChevronRight size={16} />
                {:else}
                    <ChevronDown size={16} />
                {/if}
            </span>
            <span>PORTFOLIO</span>
        </div>

        {#if !collapsedFolders["root"]}
            {#each fileSystem["root"].children || [] as childId}
                {@render FileTree(childId, 1)}
            {/each}
        {/if}
    </div>
</div>
