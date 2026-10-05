/**
 * Lightweight, motivated motion. Everything collapses to static under prefers-reduced-motion.
 * - [data-reveal]: content enters as it scrolls into view (hierarchy and reading order)
 * - [data-rule]: gold rules draw in, echoing the rules in the logo
 * - [data-count]: figures count up once, so the number is read as a measured value
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = () => {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal], [data-rule]');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
};

const formatNumber = (n: number, decimals: number) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const countUp = () => {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    const out = el.querySelector<HTMLElement>('[data-count-value]') ?? el;
    if (reduce || Number.isNaN(target)) {
      out.textContent = formatNumber(target, decimals);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      out.textContent = formatNumber(target * eased, decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!('IntersectionObserver' in window)) return els.forEach(run);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.5 },
  );
  els.forEach((el) => io.observe(el));
};

reveal();
countUp();
