<!-- <script lang="ts">
	import '../app.css'
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>Svelte GUI</title>
</svelte:head>

<div class="container">
    <main>
        <slot />
    </main>
</div>

<style>
    .container {
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
    }

    main {
        width: 100%;
        height: 100%;
        border-radius: 10px;

        display: grid;
        place-content: center;
        margin: 0;
        font-family: 'Manrope', sans-serif;
        color: hsl(220 10% 98%);
        background-color: hsl(220 10% 10%);
    }
</style> -->

<slot />
