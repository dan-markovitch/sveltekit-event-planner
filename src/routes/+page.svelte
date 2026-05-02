<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<h1 class="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h1>

{#await data.events}
    <div class="flex items-center gap-3 text-indigo-600">
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span>Loading events...</span>
    </div>
{:then events}
    {#if events.length === 0}
        <div class="text-center py-16 text-gray-400">
            <p class="text-lg">No events yet.</p>
            <a href="/newevent" class="mt-4 inline-block text-indigo-600 font-semibold hover:underline">Create your first event →</a>
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            {#each events as event}
                <a href="/{event.id}" class="block bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-5 hover:shadow-md hover:border-indigo-300 transition">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-800">{event.title}</h2>
                        <span class="text-sm text-indigo-600 font-medium">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {#if event.description}
                        <p class="text-gray-500 text-sm mt-1 truncate">{event.description}</p>
                    {/if}
                </a>
            {/each}
        </div>
    {/if}
{/await}