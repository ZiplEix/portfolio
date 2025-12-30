<script lang="ts">
    import TabGroup from "$lib/components/TabGroup.svelte";
    import Editor from "$lib/components/Editor.svelte";
</script>

<div class="flex flex-col h-full w-full">
    <!-- Tabs -->
    <TabGroup />

    <!-- Editor Content -->
    <div class="flex-1 overflow-hidden relative">
        <Editor />
    </div>
</div>
