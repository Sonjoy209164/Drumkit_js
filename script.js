function playSoundByKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

// Keyboard Support
function playSound(e) {
  playSoundByKeyCode(e.keyCode);
}

// Touch/Click Support (prevent double trigger)
function handleClickOrTouch(e) {
  e.preventDefault(); // prevents double trigger from touch and click
  const keyDiv = e.currentTarget;
  const keyCode = keyDiv.getAttribute('data-key');
  playSoundByKeyCode(keyCode);
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('touchstart', handleClickOrTouch, { passive: false });
  key.addEventListener('click', handleClickOrTouch);
});

window.addEventListener('keydown', playSound);
