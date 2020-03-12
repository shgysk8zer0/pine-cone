import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import { $, registerServiceWorker, ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import * as handlers from './handlers.js';
document.documentElement.classList.replace('no-js', 'js');

if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
	registerServiceWorker(document.documentElement.dataset.serviceWorker).catch(console.error);
}

ready().then(() => {
	document.body.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
	document.body.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);
	handlers.hashChange({newURL: location.href});
	$('[data-action]').click(event => {
		const action = event.target.closest('[data-action]').dataset.action;

		if (action in handlers) {
			handlers[action](event);
		}
	});
});


window.addEventListener('hashchange', ({newURL, oldURL}) => handlers.hashChange({newURL, oldURL}), {passive: true});
