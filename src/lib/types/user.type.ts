import type { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    name: string;
    description: string;
    invitation: Invitation;
    credentials: Credentials;
    subscriptions: Subscription[];
}

export interface ClientUser {
    _id: string;
    name: string;
    description: string;
}

export interface Invitation {
    code?: string;
    challenge?: string;
}

export interface Credentials {
    credentialPublicKey: string;
    credentialId: string;
    counter: number;
}

export interface Subscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    }
}
