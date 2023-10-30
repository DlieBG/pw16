import type { PushSubscription } from "web-push";

export interface User {
    _id: any;
    name: string;
    subscriptions?: PushSubscription[];
}
