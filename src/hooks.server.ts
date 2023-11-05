import { VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } from "$env/static/private";
import { get_user_for_session } from "$lib/server/user.server";
import type { Handle } from "@sveltejs/kit";
import { setVapidDetails } from "web-push";

setVapidDetails(
    'https://deborpw16.benedikt-schwering.de',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = await get_user_for_session(event.cookies.get('pw16_session'));

    return resolve(event);
};
