import type { Actions, PageServerLoad } from "./$types";
import pkg from 'web-push';
import { mongo } from "$lib/server/db.server";
import { ObjectId } from "mongodb";
const { sendNotification } = pkg

export const load: PageServerLoad = async ({ }) => {
    const users = await mongo.collection('users').find({}).toArray();

    return {
        users: users.map(
            (user) => {
                return {
                    id: user._id.toString(),
                    text: `${user.name} (${user.description})`
                };
            }
        )
    }
};

export const actions = {
    send: async ({ request, cookies }) => {
        const form = await request.formData();
        const title = form.get('title')?.toString();
        const message = form.get('message')?.toString();

        let user_ids = [];

        for (let entry of form.keys())
            if (entry != 'title' && entry != 'message')
                user_ids.push(new ObjectId(entry));

        const users = await mongo.collection('users').find({
            _id: {
                $in: user_ids
            }
        }).toArray();

        for (let user of users) {
            if (user && user.subscriptions && title && message)
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
        }
    },
} satisfies Actions;
