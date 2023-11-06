import type { PageServerLoad } from './$types';
import { mongo } from '$lib/server/db.server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { error } from '@sveltejs/kit';

export const ssr = false;

export const load: PageServerLoad = async ({ params, url }) => {
    let user = await mongo.collection('users').findOne({
        'invitation.code': params.code
    });

    if (!user)
        throw error(404);

    let options = await generateRegistrationOptions({
        rpID: url.hostname,
        rpName: 'Schwering pw16',
        userID: user['_id'].toString(),
        userName: user['name'],
        timeout: 60000,
        attestationType: 'direct',
        supportedAlgorithmIDs: [-7, -257],
    });

    await mongo.collection('users').updateOne({
        _id: user['_id']
    }, {
        $set: {
            'invitation.challenge': options.challenge
        }
    });

    return {
        name: user['name'],
        options
    };
};
