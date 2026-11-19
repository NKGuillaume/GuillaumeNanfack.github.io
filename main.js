const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tiles = [...document.querySelectorAll('.tiles span')];
const route = [...document.querySelectorAll('.route li')];
const words = route.map((li) => li.textContent);

const show = (i, animate) => {
  [...words[i]].forEach((ch, k) => {
    const t = tiles[k];
    if (t.textContent === ch) return t.classList.remove('hit');
    t.classList.add('hit');
    if (!animate) return (t.textContent = ch);
    t.classList.remove('flip');
    void t.offsetWidth; // restart the flip animation
    t.classList.add('flip');
    setTimeout(() => (t.textContent = ch), 190); // swap at the edge-on point
  });
  route.forEach((li, k) => li.classList.toggle('on', k === i));
};

if (still) show(words.length - 1, false);
else {
  show(0, false);
  words.slice(1).forEach((_, k) => setTimeout(() => show(k + 1, true), 900 + k * 850));
}

// Games load only on request: no extra page weight, and Tab never lands inside a game by accident.
document.querySelectorAll('.embed button').forEach((b) => b.addEventListener('click', () => {
  const box = b.parentElement;
  const f = Object.assign(document.createElement('iframe'), { src: box.dataset.src, title: box.dataset.title });
  f.allow = 'clipboard-write'; // lets the game's share button copy results
  box.replaceChildren(f);
  f.focus();
}));
