<script lang="ts">
    import * as config from "$lib/config"
  import Toggle from "./toggle.svelte";
</script>

<nav>
    <a href="/" class="title">
        <b>{config.title}</b>
    </a>

    <Toggle />
</nav>


<style>
    nav {
        padding-block: var(--size-7);
        align-items: center;

        border-bottom: 1px solid var(--border);
    }

    a {
        color: inherit;
        text-decoration: none;

        font-size: var(--font-size-fluid-1);
    }

    @media (min-width: 768px) {
        nav {
            display: flex;
            justify-content: space-between;
        }
    }
</style>