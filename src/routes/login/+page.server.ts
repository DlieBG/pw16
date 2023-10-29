import { mongo } from '$lib/server/db';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url }) => {
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
            options
        };
    }
};

export const actions = {
    logout: async ({ cookies }) => {
        await mongo.collection('sessions').deleteOne({
            'session': cookies.get('pw16_session')
        });

        cookies.delete('pw16_session');
    },
} satisfies Actions;
