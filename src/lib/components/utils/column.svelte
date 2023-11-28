<script lang='ts'>
    export let alignment: 'start' | 'center' | 'end' | 'spaceAround' | 'spaceEvenly' = 'center';
</script>

<style>
    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .start {
        align-items: flex-start;
    }

    .center {
        align-items: center;
    }

    .end {
        align-items: flex-end;
    }

    .spaceAround {
        align-items: space-around;
    }

    .spaceEvenly {
        align-items: space-evenly;
    }
</style>

<div class="column {alignment}">
    <slot />
</div>
