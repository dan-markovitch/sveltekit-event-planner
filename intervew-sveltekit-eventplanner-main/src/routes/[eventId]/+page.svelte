<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	interface FormResult {
		error?: string;
		title?: string;
		description?: string;
		date?: string;
	}

	let { data, form }: { data: PageData; form: FormResult | null } = $props();
	let editing = $state(false);
	let submitting = $state(false);

	function formatDateForInput(dateStr: string): string {
		const d = new Date(dateStr);
		const pad = (n: number) => n.toString().padStart(2, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
	}

	function formatDateDisplay(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="max-w-xl">
	{#if data.event}
		{#if !editing}
			<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
				<div class="flex items-start justify-between mb-4">
					<h1 class="text-2xl font-bold text-gray-800">{data.event.title}</h1>
					<span class="text-xs text-gray-400 font-mono">#{data.event.id}</span>
				</div>

				{#if data.event.description}
					<p class="text-gray-600 mb-4">{data.event.description}</p>
				{/if}

				<div class="flex items-center gap-2 text-indigo-600 text-sm font-medium">
					<span>📅</span>
					<span>{formatDateDisplay(data.event.date)}</span>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<button
					onclick={() => (editing = true)}
					class="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
				>
					Edit
				</button>

				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
				>
					<button
						type="submit"
						disabled={submitting}
						onclick={(e) => {
							if (
								!confirm(
									`Are you sure you want to delete "${data.event?.title}"? This cannot be undone.`
								)
							) {
								e.preventDefault();
							}
						}}
						class="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-600 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{submitting ? 'Deleting...' : 'Delete'}
					</button>
				</form>

				<a href="/" class="text-sm text-gray-500 hover:text-gray-700 hover:underline ml-2"
					>← Back to Events</a
				>
			</div>
		{:else}
			<h1 class="text-3xl font-bold text-gray-800 mb-8">Edit Event</h1>

			<form
				method="POST"
				action="?/update"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
				class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col gap-6"
			>
				<div class="flex flex-col gap-1">
					<label for="title" class="text-sm font-semibold text-gray-700"
						>Title <span class="text-red-500">*</span></label
					>
					<input
						type="text"
						id="title"
						name="title"
						value={form?.title ?? data.event.title}
						required
						class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<label for="description" class="text-sm font-semibold text-gray-700">Description</label>
					<textarea
						id="description"
						name="description"
						rows="4"
						class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
						>{form?.description ?? data.event.description ?? ''}</textarea
					>
				</div>

				<div class="flex flex-col gap-1">
					<label for="date" class="text-sm font-semibold text-gray-700"
						>Date & Time <span class="text-red-500">*</span></label
					>
					<input
						type="datetime-local"
						id="date"
						name="date"
						value={form?.date ?? formatDateForInput(data.event.date)}
						required
						class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
					/>
				</div>

				{#if form?.error}
					<p class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
						{form.error}
					</p>
				{/if}

				<div class="flex gap-3">
					<button
						type="submit"
						disabled={submitting}
						class="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
					>
						{submitting ? 'Saving...' : 'Save Changes'}
					</button>

					<button
						type="button"
						onclick={() => (editing = false)}
						class="bg-gray-100 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition text-sm"
					>
						Cancel
					</button>
				</div>
			</form>
		{/if}
	{/if}
</div>
