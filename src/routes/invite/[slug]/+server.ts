import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { mongo } from '$lib/server/db';
import { verifyRegistrationResponse } from '@simplewebauthn/server';

export const POST: RequestHandler = async ({ request, params, url }) => {
    const response = await request.json();

    let user = await mongo.collection('users').findOne({
        'invitation.code': params.slug
    });
    
    if (!user)
        throw error(404);

    let verification = await verifyRegistrationResponse({
        response,
        expectedChallenge: user.invitation.challenge,
        expectedOrigin: url.origin,
        expectedRPID: url.hostname,
        requireUserVerification: true
    });
    
    if(!verification.verified || !verification.registrationInfo)
        throw error(401);
    
    await mongo.collection('users').updateOne({
        _id: user['_id']
    }, {
        $set: {
            invitation: {
                code: null,
                challenge: null
            },
            credentials: {
                credentialPublicKey: verification.registrationInfo.credentialPublicKey,
                credentialID: verification.registrationInfo.credentialID,
                counter: verification.registrationInfo.counter
            }
        }
    });

    return json({});
};
