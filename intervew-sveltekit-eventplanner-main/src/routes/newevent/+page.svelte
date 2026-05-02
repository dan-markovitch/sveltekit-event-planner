<script lang="ts">
    import { enhance } from '$app/forms';

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
    <input type="text" id="title" name="title" required>
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description"></textarea>
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" required>
    <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create Event'}
    </button>
</form>