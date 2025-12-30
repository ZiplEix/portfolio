<script lang="ts">
    import { activeActivity } from "$lib/store";
    import Explorer from "./Explorer.svelte";
    import Search from "./Search.svelte";
    import GitHistory from "./GitHistory.svelte";

    let current = $state("explorer");
    activeActivity.subscribe((v) => (current = v));
</script>

<div class="h-full bg-vscode-sidebar">
    {#if current === "explorer"}
        <Explorer />
    {:else if current === "search"}
        <Search />
    {:else if current === "git"}
        <GitHistory />
    {/if}
</div>
