// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib/types/user.type";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			user: User
		}
		// interface Platform {}
	}
}

export {};
