import { mongo } from "$lib/server/db.server";
import { ObjectId } from "mongodb";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params }) => {
    let user = await mongo.collection('users')
        .findOne({
            '_id': new ObjectId(params._id)
        });

    return {
        admin_user: {
            ...user,
            _id: user._id.toString(),
            credentials: !!user.credentials.credentialID
        }
    };
};
