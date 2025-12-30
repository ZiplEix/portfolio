<script lang="ts">
    import { files, openFile, type File } from "$lib/store";
    import { slide } from "svelte/transition";

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
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="cursor-pointer hover:text-white"
            >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
            </svg>
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
                        <span class="mr-1 w-4 flex justify-center">
                            {#if collapsedFolders[file.id]}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <polyline points="9 18 15 12 9 6"
                                    ></polyline>
                                </svg>
                            {:else}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9"
                                    ></polyline>
                                </svg>
                            {/if}
                        </span>
                        <span class="font-semibold text-xs truncate"
                            >{file.name.toUpperCase()}</span
                        >
                    {:else}
                        <span class="mr-1 w-4"></span>
                        <!-- Icon based on extension or type -->
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
            <span class="mr-1 w-4 flex justify-center">
                {#if collapsedFolders["root"]}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                {:else}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
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
