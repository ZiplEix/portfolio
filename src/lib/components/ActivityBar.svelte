<script lang="ts">
    import { toggleSidebar } from "$lib/store";
</script>

<div
    class="w-12 h-full bg-vscode-activity flex flex-col items-center py-2 text-vscode-text select-none"
>
    <div
        class="p-3 border-l-2 border-vscode-text cursor-pointer"
        onclick={toggleSidebar}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && toggleSidebar()}
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
    <div class="p-3 opacity-50 cursor-pointer hover:opacity-100">
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
    <div class="p-3 opacity-50 cursor-pointer hover:opacity-100">
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
