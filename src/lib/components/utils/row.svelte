<script lang='ts'>
    export let alignment: 'start' | 'center' | 'end' | 'spaceAround' | 'spaceEvenly' = 'center';
</script>

<!-- a svelte component to do somethink similar to the Row widget in flutter, the flex depend on the alignment property -->

<style>
    .row {
        display: flex;
        flex-direction: row;
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

<div class="row {alignment}">
    <slot />
</div>
