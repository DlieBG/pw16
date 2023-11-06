import { mongo } from '$lib/server/db.server';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ }) => {
    let users = (
        await mongo.collection('users')
            .find({})
            .toArray()
    ).map(
        (user) => {
            return {
                ...user,
                _id: user._id.toString(),
                credentials: !!user.credentials.credentialID
            };
        }
    );

    return {
        users
    };
};

