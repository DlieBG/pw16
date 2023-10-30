import type { Actions } from "./$types";
import { get_user } from "$lib/server/user";
import pkg from 'web-push';
const { sendNotification } = pkg

export const actions = {
    send: async ({ request, cookies }) => {
        const user = await get_user(cookies.get('pw16_session'), true);
        const title = (await request.formData()).get('title')?.toString();
        const message = (await request.formData()).get('message')?.toString();

        if (user && user.subscriptions && message)
            user.subscriptions.forEach(async (subscription) => {
                try {
                    await sendNotification(subscription, JSON.stringify({
                        title,
                        options: {
                            body: message
                        }
                    }));
                } catch { }
            });
    },
} satisfies Actions;
