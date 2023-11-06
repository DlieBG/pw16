self.addEventListener('push', function (event) {
	if (!event.data) return;

	let payload = event.data.json();

	event.waitUntil(
		self.registration.showNotification(payload.title, payload.options)
	);
});

self.addEventListener('pushsubscriptionchange', function (event) {
	event.waitUntil(
		fetch('/login', {
			method: 'PATCH',
			body: JSON.stringify(event.newSubscription)
		})
	);
});
