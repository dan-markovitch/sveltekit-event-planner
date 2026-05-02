<script lang="ts">
    import '../app.css';
    let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
    <nav class="bg-indigo-700 text-white px-6 py-4 shadow-md">
        <div class="max-w-3xl mx-auto flex items-center justify-between">
            <a href="/" class="text-xl font-bold tracking-wide">🗓️ Stargate Events</a>
            <a href="/newevent" class="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-indigo-50 transition">
                + New Event
            </a>
        </div>
    </nav>

    <main class="max-w-3xl mx-auto px-6 py-10">
        {@render children()}
    </main>
</div>