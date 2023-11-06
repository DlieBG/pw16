import { mongo } from '$lib/server/db.server';
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user || !locals.user.admin)
        throw redirect(307, '/');
};

