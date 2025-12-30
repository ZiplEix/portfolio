<script lang="ts">
    let subject = $state("");
    let content = $state("");

    function handleSubmit(e: Event) {
        e.preventDefault();
        const mailtoLink = `mailto:leroyerbaptiste@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(content)}`;
        window.open(mailtoLink, "_blank");
    }
</script>

<div class="p-8 max-w-2xl mx-auto text-vscode-text">
    <h1 class="text-3xl font-bold mb-6">Contact Me</h1>
    <form onsubmit={handleSubmit} class="space-y-6">
        <div class="flex flex-col gap-2">
            <label for="subject" class="text-sm font-semibold">Subject</label>
            <input
                type="text"
                id="subject"
                bind:value={subject}
                required
                class="bg-[#3c3c3c] border border-vscode-border text-vscode-text p-2 rounded focus:outline-none focus:border-vscode-blue"
                placeholder="Project Inquiry..."
            />
        </div>

        <div class="flex flex-col gap-2">
            <label for="content" class="text-sm font-semibold">Content</label>
            <textarea
                id="content"
                bind:value={content}
                required
                rows="10"
                class="bg-[#3c3c3c] border border-vscode-border text-vscode-text p-2 rounded focus:outline-none focus:border-vscode-blue font-mono"
                placeholder="Hello Baptiste, I would like to discuss..."
            ></textarea>
        </div>

        <button
            type="submit"
            class="bg-vscode-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
        >
            Send Email
        </button>
    </form>
</div>
