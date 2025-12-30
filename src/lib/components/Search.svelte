<script lang="ts">
    import { files, openFile } from "$lib/store";
    import { ChevronRight, ChevronDown, File as FileIcon } from "lucide-svelte";

    let searchQuery = $state("");
    let allFiles = $state($files);

    files.subscribe((v) => (allFiles = v));

    let searchResults = $derived(
        Object.values(allFiles).filter(
            (file) =>
                file.type === "file" &&
                file.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
</script>

<div class="flex flex-col h-full text-vscode-text select-none">
    <div class="px-4 py-2 text-xs font-bold tracking-wide uppercase">
        Search
    </div>

    <div class="px-4 py-2">
        <div class="relative">
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search"
                class="w-full bg-[#3c3c3c] text-vscode-text border border-vscode-border p-1 pl-2 text-sm focus:outline-none focus:border-vscode-blue placeholder-gray-500"
            />
        </div>
    </div>

    <div class="flex-1 overflow-y-auto mt-2">
        {#if searchQuery}
            <div class="px-4 py-1 text-xs text-vscode-text opacity-70 mb-2">
                {searchResults.length} result{searchResults.length !== 1
                    ? "s"
                    : ""} found
            </div>
            {#each searchResults as file}
                <div
                    class="flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-vscode-hover"
                    onclick={() => openFile(file.id)}
                    role="button"
                    tabindex="0"
                    onkeydown={(e) => e.key === "Enter" && openFile(file.id)}
                >
                    <FileIcon size={14} class="text-vscode-text opacity-80" />
                    <span class="text-sm">{file.name}</span>
                    <span
                        class="text-xs text-gray-500 ml-auto truncate opacity-50"
                        >{file.parentId === "root" ? "" : file.parentId}</span
                    >
                </div>
            {/each}
        {/if}
    </div>
</div>
