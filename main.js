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
