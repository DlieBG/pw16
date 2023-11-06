import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ url, locals }) => {
    if (!locals.user)
        if (!(url.pathname.startsWith('/login') || url.pathname.startsWith('/invite')))
            throw redirect(307, '/login');

    return {
        user: to_client_user(locals.user)
    };
};
