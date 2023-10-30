import { redirect } from '@sveltejs/kit';                
import type { LayoutServerData, LayoutServerLoad } from './$types';
import { get_user } from '$lib/server/user';

export const load: LayoutServerLoad = async ({ url, cookies }): LayoutServerData => {
    const user = await get_user(cookies.get('pw16_session'));
    
    if(!user)
        if(!(url.pathname.startsWith('/login') || url.pathname.startsWith('/invite'))) 
            throw redirect(307, '/login');
    
    return {
        user: user
    };
};
