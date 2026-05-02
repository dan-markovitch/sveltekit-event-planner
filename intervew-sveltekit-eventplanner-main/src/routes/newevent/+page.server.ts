import { createEvent } from "$lib/server/remote-events";
import type { Actions } from "./$types";
import { error, redirect, fail } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({request}) => {
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();

        if (!title || !date) {
            error(400, 'Title and Date are required');
        }

        const eventDate = new Date(date);
        const now = new Date();

        if (eventDate < now) {
            return fail(400, {
                error: 'Event date cannot be in the past',
                title,
                description,
                date
            });
        }

        const newEvent = await createEvent({title, description, date});
        redirect(303, `/${newEvent.id}`);
    }
}