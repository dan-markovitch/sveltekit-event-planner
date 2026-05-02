import { fetchEventById, updateEventById, deleteEventById } from "$lib/server/remote-events";
import type { PageServerLoad, Actions } from "./$types";
import { error, redirect, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const eventId = parseInt(params.eventId);
    const event = await fetchEventById(eventId);

    if (!event) {
        error(404, 'Event not found');
    }

    return { event };
};

export const actions: Actions = {
    update: async ({ params, request }) => {
        const eventId = parseInt(params.eventId);
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

        const updated = await updateEventById(eventId, { title, description, date });

        if (!updated) {
            error(404, 'Event not found');
        }

        redirect(303, `/${eventId}`);
    },

    delete: async ({ params }) => {
        const eventId = parseInt(params.eventId);
        const success = await deleteEventById(eventId);

        if (!success) {
            error(404, 'Event not found');
        }

        redirect(303, '/');
    }
};