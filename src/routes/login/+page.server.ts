import { mongo } from '$lib/server/db';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { Actions, PageServerLoad } from './$types';
import { VAPID_PRIVATE_KEY, VAPID_PUBLIC_KEY } from '$env/static/private';
import pkg from 'web-push';
const { setVapidDetails } = pkg;

export const load: PageServerLoad = async ({ parent, url }) => {
    setVapidDetails(
        'https://deborpw16.benedikt-schwering.de',
        VAPID_PUBLIC_KEY,
        VAPID_PRIVATE_KEY
    );

    const { user } = await parent();

    if (!user) {
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
