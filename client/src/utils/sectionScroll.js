export const PORTFOLIO_SECTIONS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'certificates', label: 'Certificates' },
  { key: 'github', label: 'GitHub' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'contact', label: 'Contact' }
];

export function isExternalTarget(target) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(String(target || ''));
}

export function scrollToSection(target) {
  const key = String(target || '').replace(/^#/, '').trim();
  if (!key) return;
  const element = document.getElementById(key);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.pushState(null, '', `#${key}`);
}

export default scrollToSection;
