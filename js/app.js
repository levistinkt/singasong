let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');

// Listen for the beforeinstallprompt event (Android)
window.addEventListener('beforeinstallprompt', (event) => {
	event.preventDefault(); // Prevent the mini-infobar from appearing
	deferredPrompt = event; // Save the event for later use
	installPrompt.classList.add('show'); // Show the custom install button
});

// Handle the install prompt click
installPrompt.addEventListener('click', async () => {
	if (deferredPrompt) {
		// Show the install prompt
		deferredPrompt.prompt();
		
		// Wait for the user's response
		const choiceResult = await deferredPrompt.userChoice;
		if (choiceResult.outcome === 'accepted') {
			console.log('User accepted the install prompt');
		} else {
			console.log('User dismissed the install prompt');
		}
		deferredPrompt = null; // Reset the deferred prompt
		installPrompt.classList.remove('show'); // Hide the custom install button
	}
});

// Detect if the app is already installed
window.addEventListener('appinstalled', () => {
	console.log('PWA was installed');
	installPrompt.classList.remove('show'); // Hide the custom install button
});