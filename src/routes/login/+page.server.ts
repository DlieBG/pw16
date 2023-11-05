import { mongo } from '$lib/server/db.server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { Actions, PageServerLoad } from './$types';
import { VAPID_PUBLIC_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ locals, url }) => {
    if (locals.user) {
        let users = await mongo.collection('users').find({}).toArray();

        let options = await generateAuthenticationOptions({
            rpID: url.hostname,
            timeout: 60000,
            userVerification: 'required',
            allowCredentials: users
                .filter(
                    (user) => {
                        return !!user.credentials.credentialID;
                    }
                )
                .map(
                    (user) => {
                        return {
                            id: user.credentials.credentialID.buffer,
                            type: 'public-key'
                        };
                    }
                )
        });

        await mongo.collection('challenges').insertOne({
            challenge: options.challenge,
            date: new Date()
        });

        return {
            options,
            public_key: VAPID_PUBLIC_KEY
        };
    }
};

export const actions = {
    logout: async ({ cookies }) => {
        await mongo.collection('sessions').deleteOne({
            session: cookies.get('pw16_session')
        });

        cookies.delete('pw16_session');
    },
} satisfies Actions;
