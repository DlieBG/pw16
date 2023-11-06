import { redirect } from '@sveltejs/kit';                
import type { LayoutServerData, LayoutServerLoad } from './$types';
import { to_client_user } from '$lib/server/user.server';

export const load: LayoutServerLoad = async ({ url, locals }): LayoutServerData => {
    if(!locals.user)
        if(!(url.pathname.startsWith('/login') || url.pathname.startsWith('/invite'))) 
            throw redirect(307, '/login');
    
    return {
        user: to_client_user(locals.user)
    };
};
