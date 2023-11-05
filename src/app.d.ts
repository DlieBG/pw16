// See https://kit.svelte.dev/docs/types#app

import type { ClientUser, User } from "$lib/types/user.type";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
		}
		interface PageData {
			user: ClientUser | null;
		}
		// interface Platform {}
	}
}

export {};
