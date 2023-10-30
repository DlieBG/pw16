import type { ObjectId } from "mongodb";
import type { PushSubscription } from "web-push";

export interface User {
    _id: ObjectId;
    name: string;
    description: string;
    subscriptions?: PushSubscription[];
}
