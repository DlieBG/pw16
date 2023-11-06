import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { mongo } from '$lib/server/db.server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { isoBase64URL, isoUint8Array } from '@simplewebauthn/server/helpers';
import { UUID } from 'mongodb';

export const POST: RequestHandler = async ({ request, cookies, url }) => {
    const response = await request.json();

    let users = await mongo.collection('users').find({}).toArray();

    for (const user of users) {
        if (isoUint8Array.areEqual(user.credentials.credentialID.buffer, isoBase64URL.toBuffer(response.rawId))) {
            let challenges = await mongo.collection('challenges').find({}).toArray();

            for (const challenge of challenges) {
                try {
                    let verification = await verifyAuthenticationResponse({
                        response,
                        expectedChallenge: challenge.challenge,
                        expectedOrigin: url.origin,
                        expectedRPID: url.hostname,
                        requireUserVerification: true,
                        authenticator: {
                            credentialPublicKey: user.credentials.credentialPublicKey.buffer,
                            credentialID: user.credentials.credentialID.buffer,
                            counter: user.credentials.counter
                        }
                    });

                    if (verification.verified && verification.authenticationInfo) {
                        await mongo.collection('challenges').deleteOne({
                            _id: challenge._id
                        });

                        let session = UUID.generate().toString();

                        await mongo.collection('sessions').insertOne({
                            'session': session,
                            'user': user._id,
                            'date': new Date()
                        });

                        cookies.set('pw16_session', session, {
                            maxAge: 60 * 24 * 60 * 60
                        });

                        return json({
                            name: user.name
                        });
                    }
                } catch { }
            }

            throw error(401);
        }
    }

    throw error(404);
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
    const response = await request.json();

    let session_id = cookies.get('pw16_session');

    if(session_id) {
        let session = await mongo.collection('sessions').findOne({
            session: session_id
        });

        if (session) {
            let update = await mongo.collection('users').updateOne({
                _id: session.user
            }, {
                $addToSet: {
                    subscriptions: response
                }
            });

            if (update.matchedCount == 1)
                return json({});
        }
    }

    throw error(404);
}

export const PATCH: RequestHandler = async ({ request, cookies }) => {
    const response = await request.json();

    await mongo.collection('new_session').insertOne({
        date: new Date(),
        session_id: cookies.get('pw16_session'),
        new_subscription: response
    });

    let session_id = cookies.get('pw16_session');

    if(session_id) {
        let session = await mongo.collection('sessions').findOne({
            session: session_id
        });

        if (session) {
            let update = await mongo.collection('users').updateOne({
                _id: session.user
            }, {
                $addToSet: {
                    subscriptions: response
                }
            });

            if (update.matchedCount == 1)
                return json({});
        }
    }

    throw error(404);
}
