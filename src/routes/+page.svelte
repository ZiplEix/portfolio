<script lang="ts">
	import '../app.css'
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    import { Row, Column } from '$lib/components/utils';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<main>
    <Column>
        <h1>Welcome on Baptiste Leroyer's portfolio</h1>
        <div style="height: 50px"></div>
        <Column alignment="start">
            <div style="height: 25px"></div>
            <ul>
                <li>
                    <Row>
                        <h2><a href="/blog">blog</a></h2>
                        <div style="width: 100px"></div>
                        <p>My projects and thoughts</p>
                    </Row>
                </li>
                <div style="height: 15px"></div>
                <li>
                    <Row>
                        <h2><a href="https://github.com/ZiplEix" target="_blank">Github</a></h2>
                        <div style="width: 100px"></div>
                        <p>A piece of art</p>
                    </Row>
                </li>
            </ul>
        </Column>
    </Column>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        width: 100%;
    }
</style>