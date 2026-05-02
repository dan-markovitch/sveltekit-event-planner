<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from "./$types";

    interface FormResult {
        error?: string;
        title?: string;
        description?: string;
        date?: string;
    }

    let { data, form }: { data: PageData, form: FormResult | null } = $props();
    let editing = $state(false);
    let submitting = $state(false);

    function formatDateForInput(dateStr: string): string {
        const d = new Date(dateStr);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
</script>

<div>
    {#if data.event}
        {#if !editing}
            <h2>{data.event.id}: {data.event.title}</h2>
            <p>{data.event.description}</p>
            <p>{data.event.date}</p>

            <button onclick={() => editing = true}>Edit</button>

            <form method="POST" action="?/delete" use:enhance={() => {
                submitting = true;
                return async ({ update }) => {
                    await update();
                    submitting = false;
                };
            }}>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Deleting...' : 'Delete'}
                </button>
            </form>

            <a href="/">Back to Events</a>
        {:else}
            <h2>Edit Event</h2>

            <form method="POST" action="?/update" use:enhance={() => {
                submitting = true;
                return async ({ update }) => {
                    await update();
                    submitting = false;
                };
            }}>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value={form?.title ?? data.event.title} required>

                <textarea id="description" name="description" rows="4" cols="50">{form?.description ?? data.event.description ?? ''}</textarea>

                <label for="date">Date</label>
                <input type="datetime-local" id="date" name="date" value={form?.date ?? formatDateForInput(data.event.date)} required>

                {#if form?.error}
                    <p class="error">{form.error}</p>
                {/if}

                <button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save Changes'}
                </button>

                <button type="button" onclick={() => editing = false}>Cancel</button>
            </form>
        {/if}
    {/if}
</div>