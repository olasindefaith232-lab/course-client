import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coursewise | Course registration, made clear" },
    {
      name: "description",
      content:
        "A clear home for student accounts, course registration, and payment review.",
    },
  ];
}

const features = [
  {
    number: "01",
    title: "One account, always visible",
    text: "Department lecturers can find activated student accounts whether students are online or offline.",
  },
  {
    number: "02",
    title: "Registration stays specific",
    text: "Students appear in a lecturer's course list only after registering for that lecturer's course.",
  },
  {
    number: "03",
    title: "Two clear decisions",
    text: "Payment confirmation and academic course approval are tracked as separate steps.",
  },
];

export default function Home() {
  return (
    <main className="landing">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Coursewise home">
          <span className="brand-mark">c</span>
          <span>coursewise</span>
        </Link>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#portals">Portals</a>
        </nav>
        <Link className="button button-dark button-small" to="/student/login">
          Sign in <span aria-hidden="true">→</span>
        </Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span /> A calmer campus workflow</div>
          <h1>
            Your courses.
            <br />
            <span>All in order.</span>
          </h1>
          <p className="hero-description">
            A simpler way for students and lecturers to manage course
            registration, payment checks, and approvals—without mixing up the
            important details.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/student/login">
              Get started <span aria-hidden="true">→</span>
            </Link>
            <a className="text-link" href="#how-it-works">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="avatar-stack" aria-hidden="true">
              <i>AO</i><i>MK</i><i>+4</i>
            </span>
            <span>Built for a more connected campus</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Course registration overview">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-sun"><span>cw</span></div>
          <div className="floating-card card-registration">
            <span className="card-icon icon-lilac">↗</span>
            <span><small>COURSE REGISTRATION</small><strong>CSC 301 · 3 credits</strong></span>
            <b className="mini-check">✓</b>
          </div>
          <div className="floating-card card-payment">
            <span className="card-icon icon-peach">₦</span>
            <span><small>PAYMENT STATUS</small><strong>Verified</strong></span>
            <b className="status-dot" />
          </div>
          <div className="art-caption"><span>01</span> A clearer view of every next step</div>
        </div>
      </section>

      <section className="principles" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">Designed around what matters</p>
          <h2>Three things. Kept distinct.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="feature-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="portal-section" id="portals">
        <div className="portal-heading">
          <div>
            <p className="eyebrow">Pick up where you belong</p>
            <h2>Made for every role.</h2>
          </div>
          <p>Choose your portal to continue to your course workspace.</p>
        </div>
        <div className="portal-grid">
          <PortalCard
            number="01"
            title="I'm a student"
            text="Register for courses, submit payment details, and follow your approvals."
            href="/student/login"
            tone="portal-student"
          />
          <PortalCard
            number="02"
            title="I'm a lecturer"
            text="Find activated department accounts and review course registrations."
            href="/lecturer/login"
            tone="portal-lecturer"
          />
          <PortalCard
            number="03"
            title="Administration"
            text="See a high-level overview of students, courses, and review progress."
            href="/admin/dashboard"
            tone="portal-admin"
          />
        </div>
      </section>

      <footer className="site-footer">
        <Link className="brand" to="/">
          <span className="brand-mark">c</span><span>coursewise</span>
        </Link>
        <span>Coursework, with a little more clarity.</span>
        <span>© 2026 Coursewise</span>
      </footer>
    </main>
  );
}

function PortalCard({
  number,
  title,
  text,
  href,
  tone,
}: {
  number: string;
  title: string;
  text: string;
  href: string;
  tone: string;
}) {
  return (
    <Link to={href} className={`portal-card ${tone}`}>
      <span className="portal-number">{number}</span>
      <span className="portal-symbol" aria-hidden="true">{number === "01" ? "↗" : number === "02" ? "⌑" : "▦"}</span>
      <span className="portal-card-copy">
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <span className="portal-link-arrow" aria-hidden="true">↗</span>
    </Link>
  );
}
