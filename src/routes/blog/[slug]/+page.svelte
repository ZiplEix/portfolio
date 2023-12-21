<script lang="ts">
    import { formatDate } from '$lib/utils.js';
    import { Github, ArrowLeft } from "lucide-svelte";

    export let data;

    function goToLink(link: string) {
        window.open(link, "_blank");
    }
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{data.meta.title}" />
</svelte:head>

<article>
    <hgroup>
        <div class="first-ligne-header">
            <div class="title">
                <button on:click={() => goToLink(data.meta.url)} aria-label="Toggle theme" class="go-back-button">
                    {#if data.meta.url}
                        <div>
                            <ArrowLeft />
                        </div>
                    {/if}
                </button>
                <h1>{data.meta.title}</h1>
            </div>
            <button on:click={() => goToLink(data.meta.url)} aria-label="Toggle theme" class="repo-button">
                {#if data.meta.url}
                    <div>
                        <Github />
                    </div>
                {/if}
            </button>
        </div>
        <p>Published at {formatDate(data.meta.date)}</p>
    </hgroup>

    <div class="tags">
        {#each data.meta.categories as category}
            <span class="surface-4">&num;{category} </span>
        {/each}
    </div>

    <div class="prose">
        <svelte:component this={data.content}/>
    </div>

</article>

<style>
    .first-ligne-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    article {
        max-inline-size: var(--size-content-3);
        margin-inline: auto;
    }

    h1 {
        text-transform: capitalize;
    }

    h1 + p {
        margin-top: var(--size-2);
        color: var(--text-2);
    }

    .tags {
        display: flex;
        gap: var(--size-3);
        margin-top: var(--size-7);
    }

    .tags > * {
        padding: var(--size-2) var(--size-3);
        border-radius: var(--radius-round);
    }

    .go-back-button {
        padding: 0;
        font-weight: inherit;
        background: none;
        border: none;
        overflow: hidden;
        padding: var(--size-1);
        margin-right: 10px;
    }

    .repo-button {
        padding: 0;
        font-weight: inherit;
        background: none;
        border: none;
        overflow: hidden;
        padding: var(--size-2);
    }

    button >* {
        display: flex;
        gap: var(--size-2);
    }
</style>
