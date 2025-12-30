<script lang="ts">
    import { toggleSidebar, activeActivity, sidebarVisible } from "$lib/store";

    let currentActivity = $state("explorer");
    activeActivity.subscribe((v) => (currentActivity = v));

    function setActivity(activity: "explorer" | "search" | "git") {
        if (currentActivity === activity && $sidebarVisible) {
            toggleSidebar();
        } else {
            activeActivity.set(activity);
            if (!$sidebarVisible) toggleSidebar();
        }
    }
</script>

<div
    class="w-12 h-full bg-vscode-activity flex flex-col items-center py-2 text-vscode-text select-none"
>
    <div
        class="p-3 border-l-2 cursor-pointer {currentActivity === 'explorer'
            ? 'border-vscode-text opacity-100'
            : 'border-transparent opacity-50 hover:opacity-100'}"
        onclick={() => setActivity("explorer")}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && setActivity("explorer")}
    >
        <!-- Files Icon -->
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
            ></path>
            <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
    </div>
    <div
        class="p-3 border-l-2 cursor-pointer {currentActivity === 'search'
            ? 'border-vscode-text opacity-100'
            : 'border-transparent opacity-50 hover:opacity-100'}"
        onclick={() => setActivity("search")}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && setActivity("search")}
    >
        <!-- Search Icon -->
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    </div>
    <div
        class="p-3 border-l-2 cursor-pointer {currentActivity === 'git'
            ? 'border-vscode-text opacity-100'
            : 'border-transparent opacity-50 hover:opacity-100'}"
        onclick={() => setActivity("git")}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && setActivity("git")}
    >
        <!-- Git Icon -->
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
        </svg>
    </div>
</div>
