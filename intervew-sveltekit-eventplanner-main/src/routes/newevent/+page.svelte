<script lang="ts">
    import { enhance } from '$app/forms';

    interface FormResult {
        error?: string;
        title?: string;
        description?: string;
        date?: string;
    }

    let { form }: { form: FormResult | null } = $props();
    let submitting = $state(false);
</script>

<div class="max-w-xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">New Event</h1>

    <form method="POST" use:enhance={() => {
        submitting = true;
        return async ({ update }) => {
            await update();
            submitting = false;
        };
    }} class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col gap-6">

        <div class="flex flex-col gap-1">
            <label for="title" class="text-sm font-semibold text-gray-700">Title <span class="text-red-500">*</span></label>
            <input
                type="text"
                id="title"
                name="title"
                value={form?.title ?? ''}
                required
                class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Event title"
            >
        </div>

        <div class="flex flex-col gap-1">
            <label for="description" class="text-sm font-semibold text-gray-700">Description</label>
            <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Optional description"
                class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            >{form?.description ?? ''}</textarea>
        </div>

        <div class="flex flex-col gap-1">
            <label for="date" class="text-sm font-semibold text-gray-700">Date & Time <span class="text-red-500">*</span></label>
            <input
                type="datetime-local"
                id="date"
                name="date"
                value={form?.date ?? ''}
                required
                class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
        </div>

        {#if form?.error}
            <p class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{form.error}</p>
        {/if}

        <button
            type="submit"
            disabled={submitting}
            class="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {submitting ? 'Creating...' : 'Create Event'}
        </button>
    </form>
</div>