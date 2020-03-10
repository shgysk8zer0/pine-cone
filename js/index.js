import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import { registerServiceWorker, ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';

if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
	registerServiceWorker(document.documentElement.dataset.serviceWorker).catch(console.error);
}

document.documentElement.classList.replace('no-js', 'js');

ready().then(() => {
	document.body.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
	document.body.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);
});
