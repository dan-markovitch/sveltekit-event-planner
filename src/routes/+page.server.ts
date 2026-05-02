import { fetchAllEvents } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        events: fetchAllEvents().then(events => 
            events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        )
    }
};