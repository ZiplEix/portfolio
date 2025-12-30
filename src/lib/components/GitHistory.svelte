<script lang="ts">
    import { GitCommitHorizontal, Circle } from "lucide-svelte";

    interface GitEvent {
        year: string;
        message: string;
        hash: string;
    }

    const events: GitEvent[] = [
        {
            year: "2025",
            message: "Final Year Student @ EPITECH & Intern @ Waarp",
            hash: "HEAD",
        },
        {
            year: "2024",
            message: "Exchange @ Chung-Ang University (Seoul)",
            hash: "e8b2a1",
        },
        {
            year: "2024",
            message: "Internship @ Waarp (Go Dev)",
            hash: "7c4d9f",
        },
        { year: "2023", message: "Head of Taker Academy", hash: "9a2b3c" },
        {
            year: "2022",
            message: "Internship @ Acoem France (GCP)",
            hash: "1d5e8f",
        },
        {
            year: "2022",
            message: "Joined Junior Conseil Taker",
            hash: "4b6a2c",
        },
        { year: "2021", message: "Started EPITECH", hash: "3f8e9d" },
        { year: "2017", message: "Moved to Spain", hash: "2a1b5c" },
        { year: "2002", message: "git init (Birth)", hash: "000000" },
    ];
</script>

<div class="flex flex-col h-full text-vscode-text select-none">
    <div
        class="px-4 py-2 text-xs font-bold tracking-wide uppercase flex items-center gap-2"
    >
        <span>Source Control</span>
    </div>

    <div class="flex-1 overflow-y-auto mt-2 px-2">
        <div class="font-mono text-xs opacity-70 mb-4 px-2">ON BRANCH MAIN</div>

        <div class="relative pl-4 border-l border-vscode-border ml-2 space-y-6">
            {#each events as event}
                <div class="relative group cursor-pointer">
                    <!-- Dot on timeline -->
                    <div
                        class="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-vscode-text border-2 border-vscode-bg-dark group-hover:bg-vscode-blue transition-colors"
                    ></div>

                    <div class="flex flex-col gap-1 pl-2">
                        <div
                            class="flex items-center gap-2 text-xs font-mono opacity-50"
                        >
                            <GitCommitHorizontal size={14} />
                            <span>{event.hash}</span>
                            <span>•</span>
                            <span>{event.year}</span>
                        </div>
                        <div
                            class="text-sm font-semibold group-hover:text-vscode-blue transition-colors"
                        >
                            {event.message}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
