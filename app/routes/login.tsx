import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useState } from "react";

type PortalRole = "student" | "lecturer";

export default function Login() {
  const { role: routeRole } = useParams();
  if (routeRole !== "student" && routeRole !== "lecturer") {
    return <Navigate to="/" replace />;
  }
  const role: PortalRole = routeRole;
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [notice, setNotice] = useState("");
  const roleName = role === "student" ? "Student" : "Lecturer";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      isRegistering
        ? "Account created in preview mode. Connect a backend to activate real accounts."
        : "Signed in to the preview workspace.",
    );
    if (!isRegistering) {
      window.setTimeout(() => navigate(`/${role}/dashboard`), 500);
    }
  }

  return (
    <main className="auth-page">
      <aside className="auth-aside">
        <Link className="brand brand-light" to="/">
          <span className="brand-mark">c</span><span>coursewise</span>
        </Link>
        <div className="auth-aside-content">
          <p className="eyebrow eyebrow-light">Your campus, in sync</p>
          <h1>Make room for the work that matters.</h1>
          <p>Course registration and payment review, with every step in its right place.</p>
          <div className="auth-quote">
            <span className="quote-mark">“</span>
            <p>Clarity for students. Confidence for lecturers.</p>
            <small>THE COURSEWISE PROMISE</small>
          </div>
        </div>
        <span className="auth-aside-foot">A little more clarity, every semester.</span>
      </aside>

      <section className="auth-content">
        <Link className="back-link" to="/">← <span>Back to home</span></Link>
        <div className="auth-form-wrap">
          <div className="role-switch" aria-label="Choose a portal">
            <Link className={role === "student" ? "selected" : ""} to="/student/login">Student</Link>
            <Link className={role === "lecturer" ? "selected" : ""} to="/lecturer/login">Lecturer</Link>
          </div>
          <p className="eyebrow">{isRegistering ? "GET STARTED" : "WELCOME BACK"}</p>
          <h2>{isRegistering ? "Create your account" : `Sign in as a ${roleName.toLowerCase()}`}</h2>
          <p className="form-intro">
            {isRegistering
              ? "Your account lets your department connect you to the right courses."
              : "Enter your details to continue to your course workspace."}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && (
              <label>
                Full name
                <input name="name" type="text" autoComplete="name" placeholder="e.g. Amina Okoro" required />
              </label>
            )}
            <label>
              {role === "student" ? "Student email" : "Work email"}
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder={role === "student" ? "you@university.edu" : "name@university.edu"}
                required
              />
            </label>
            {isRegistering && role === "student" && (
              <>
                <label>
                  Department
                  <select name="department" required defaultValue="">
                    <option value="" disabled>Select your department</option>
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Mass Communication</option>
                  </select>
                </label>
                <label>
                  Student ID
                  <input name="studentId" type="text" placeholder="e.g. CS/2024/0123" required />
                </label>
              </>
            )}
            <label>
              Password
              <input name="password" type="password" autoComplete={isRegistering ? "new-password" : "current-password"} placeholder="At least 8 characters" minLength={8} required />
            </label>
            {!isRegistering && (
              <div className="form-between">
                <label className="checkbox-label"><input type="checkbox" /> Remember me</label>
                <button className="inline-button" type="button" onClick={() => setNotice("Password recovery will be available when account services are connected.")}>Forgot password?</button>
              </div>
            )}
            {notice && <p className="form-notice" role="status">{notice}</p>}
            <button className="button button-dark button-full" type="submit">
              {isRegistering ? "Create account" : "Sign in"} <span aria-hidden="true">→</span>
            </button>
          </form>
          {role === "student" && (
            <p className="form-toggle">
              {isRegistering ? "Already have an account?" : "New to Coursewise?"}{" "}
              <button className="inline-button" type="button" onClick={() => { setIsRegistering(!isRegistering); setNotice(""); }}>
                {isRegistering ? "Sign in" : "Create an account"}
              </button>
            </p>
          )}
          <p className="preview-note"><span /> Preview only — authentication is not connected yet.</p>
        </div>
      </section>
    </main>
  );
}
