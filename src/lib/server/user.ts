import type { User } from "$lib/types/user.type";
import { mongo } from "./db";

export const get_user = async (session_id: string | undefined, all: boolean = false): Promise<User | null> => {
    if (session_id) {
        let session = await mongo.collection('sessions').findOne({
            session: session_id
        });

        if (session) {
            let user = await mongo.collection('users').findOne({
                _id: session.user
            });

            if (user)
                return {
                    _id: user?._id.toString(),
                    name: user.name,
                    ...all ? user : {}
                };
        }
    }

    return null;
};
