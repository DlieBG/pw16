import type { ClientUser, User } from "$lib/types/user.type";
import { mongo } from "./db.server";

export const get_user_for_session = async (session_id: string | undefined, all: boolean = false): Promise<User | null> => {
    let session = await mongo.collection('sessions')
        .findOne({
            session: session_id
        });

    if (session)
        return await mongo.collection('users')
            .findOne<User>({
                _id: session.user
            });

    return null;
};

export const to_client_user = (user: User | null): ClientUser | null => {
    if (user)
        return {
            _id: user._id.toString(),
            name: user.name,
            description: user.description
        };

    return null;
};
