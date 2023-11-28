<script lang="ts">
	import '../app.css'
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    import { Row, Column } from '$lib/components/utils';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>Svelte GUI</title>
</svelte:head>

<div class="container">
    <main>
        <Column>
            <Row alignment="start">
                <Column alignment="start">
                    <h1>Welcome on Baptiste Leroyer's portfolio</h1>
                    <p>Soon on this page there will be all my infos and projects ;)</p>
                </Column>
                <h2>This site is still under construction</h2>
            </Row>
            <div style="height: 50px"></div>
            <Column alignment="start">
                <h2>here is a temporary list of my projects:</h2>
                <div style="height: 25px"></div>
                <ul>
                    <li>
                        <Row>
                            <h2><a href="/test">test</a></h2>
                            <div style="width: 100px"></div>
                            <p>A test for redacting my ptoject description in markdown and embed it in svelte for this web site</p>
                        </Row>
                    </li>
                    <div style="height: 15px"></div>
                    <li>
                        <Row>
                            <h2><a href="https://area.baptiste.zip">Area</a></h2>
                            <div style="width: 100px"></div>
                            <p>A school project that we made with lot of fun with my team. It is ready for production</p>
                        </Row>
                    </li>
                    <div style="height: 15px"></div>
                    <li>
                        <Row>
                            <h2><a href="https://github.com/ZiplEix">Github</a></h2>
                            <div style="width: 100px"></div>
                            <p>A piece of art</p>
                        </Row>
                    </li>
                </ul>
            </Column>
        </Column>
    </main>
</div>

<style>
    @import 'open-props/style';
    @import 'open-props/normalize';
    .container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        border-radius: 10px;

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
</style>
