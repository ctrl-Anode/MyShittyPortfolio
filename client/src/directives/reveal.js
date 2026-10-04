let observer = null;

function createObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  return observer;
}

export function revealDirective(el, binding) {
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  const value = binding.value || {};
  const from = typeof value === 'string' ? value : value.from || 'up';
  el.classList.add('reveal', from);

  if (typeof value === 'object' && value.delay) {
    el.style.transitionDelay = `${value.delay}ms`;
  }

  createObserver().observe(el);
}

export default revealDirective;