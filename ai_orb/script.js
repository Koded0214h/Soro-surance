const orb = document.getElementById('orb');
const statusText = document.getElementById('statusText');

let isListening = false;

orb.addEventListener('click', () => {
  isListening = !isListening;
  orb.classList.toggle('listening');

  statusText.textContent = isListening
    ? "Listening... Speak now"
    : "Tap to Start Listening";

  // Here you can trigger your real voice-to-text logic
});
