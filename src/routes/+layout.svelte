<script lang="ts">
	import "./layout.css";
	import ActivityBar from "$lib/components/ActivityBar.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import StatusBar from "$lib/components/StatusBar.svelte";
	import { onMount } from "svelte";
	import { sidebarVisible } from "$lib/store";

	let { children } = $props();
	let isSidebarVisible = $state(true);

	// Subscribe without $state derived if using store directly inside template isn't preferred or mixed usage
	sidebarVisible.subscribe((v) => (isSidebarVisible = v));

	onMount(() => {
		if (window.innerWidth < 1000) {
			sidebarVisible.set(false);
		}
	});
</script>

<div
	class="flex flex-col h-screen text-vscode-text bg-vscode-bg-dark overflow-hidden"
>
	<div class="flex flex-1 overflow-hidden">
		<!-- Activity Bar (Far Left) -->
		<ActivityBar />

		<!-- Sidebar (File Explorer) -->
		{#if isSidebarVisible}
			<div class="w-[250px] flex flex-col border-r border-vscode-border">
				<Sidebar />
			</div>
		{/if}

		<!-- Main Content Area -->
		<div class="flex-1 flex flex-col bg-vscode-bg-dark min-w-0">
			{@render children()}
		</div>
	</div>

	<!-- Status Bar (Bottom) -->
	<StatusBar />
</div>
