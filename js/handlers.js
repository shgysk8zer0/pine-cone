export function hashChange({newURL, oldURL = null})  {
	const [from, to] = [
		typeof oldURL === 'string' ? new URL(oldURL).hash.substr(1) : null,
		new URL(newURL).hash.substr(1)
	];

	const target = document.getElementById(to);
	const leaving = document.getElementById(from);

	if (target instanceof HTMLElement && target.tagName === 'DIALOG') {
		target.showModal();
	} else if (target instanceof HTMLElement && target.tagName === 'TOAST-MESSAGE') {
		customElements.whenDefined('toast-message').then(() => target.show());
	}

	if (leaving instanceof HTMLElement && ['DIALOG', 'TOAST-MESSAGE'].includes(leaving.tagName)) {
		leaving.close();
	}
}
