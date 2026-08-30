import Logo from './Logo';
import { InstagramIcon } from './Icons';
import { site } from '../content/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <a href="/" aria-label={`${site.name} — home`}><Logo size={34} id="footer" /></a>
        <p className="footer__legal">
          © {new Date().getFullYear()} {site.legalName} — {site.tagline}
        </p>
        <nav className="footer__links" aria-label="Footer">
          <a href="/questionnaire">Questionnaire</a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={15} />
            <span>Instagram</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
