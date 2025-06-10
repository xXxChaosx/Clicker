export function playSound(src) {
  const audio = new Audio(src);
  audio.volume = 0.5;
  audio.play();
}