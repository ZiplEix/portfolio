<script lang="ts">
	import '../app.css'
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	import Header from './header.svelte';
	import Footer from './footer.svelte';
    import PageTransition from "./transition.svelte";

    inject({ mode: dev ? 'development' : 'production' });

    injectSpeedInsights();

    export let data;
</script>

<svelte:head>
	<title>Baptiste's portfolio</title>
</svelte:head>

<div class="container">
    <main>
        <Header />

        <PageTransition url={data.url}>
            <slot />
        </PageTransition>

        <Footer />
    </main>
</div>

<style>
    @import 'open-props/style';
    @import 'open-props/normalize';

    main {
        height: 100%;
        max-inline-size: 1440px;
        display: grid;
        grid-template-rows: auto 1fr auto;
        margin-inline: auto;
        padding-inline: var(--size-7);

        min-height: 100vh;
        min-width: 100vw;
    }


    /* .container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        background: linear-gradient(
            45deg,
            #ff0000,
            #ff8000,
            #ffff00,
            #80ff00,
            #00ff00,
            #00ff80,
            #00ffff,
            #0080ff,
            #0000ff,
            #8000ff,
            #ff00ff,
            #ff0080,
            #ff0000
        );

        padding: 3px;
    } */
</style>
