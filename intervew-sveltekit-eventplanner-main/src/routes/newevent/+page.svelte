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

<form method="POST" use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
        await update();
        submitting = false;
    };
}}>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value={form?.title ?? ''} required>

    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description">{form?.description ?? ''}</textarea>

    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" value={form?.date ?? ''} required>

    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}

    <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Event'}
    </button>
</form>