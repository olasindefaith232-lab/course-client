import { Link, Navigate, useParams } from "react-router";
import { useState } from "react";

type Student = {
  name: string;
  initials: string;
  studentId: string;
  department: string;
  lastSeen: string;
};

type Registration = {
  student: string;
  initials: string;
  course: string;
  code: string;
  payment: "Awaiting payment" | "Under review" | "Verified";
  approval: "Pending" | "Approved";
};

const students: Student[] = [
  { name: "Amina Okoro", initials: "AO", studentId: "CS/2024/0123", department: "Computer Science", lastSeen: "Online now" },
  { name: "Tunde Balogun", initials: "TB", studentId: "CS/2023/0088", department: "Computer Science", lastSeen: "2 hours ago" },
  { name: "Mariam Yusuf", initials: "MY", studentId: "CS/2024/0157", department: "Computer Science", lastSeen: "Yesterday" },
  { name: "David Eze", initials: "DE", studentId: "CS/2022/0041", department: "Computer Science", lastSeen: "3 days ago" },
  { name: "Chioma Nwosu", initials: "CN", studentId: "CS/2023/0102", department: "Computer Science", lastSeen: "5 days ago" },
];

const startingRegistrations: Registration[] = [
  { student: "Amina Okoro", initials: "AO", course: "Data Structures & Algorithms", code: "CSC 301", payment: "Verified", approval: "Approved" },
  { student: "Tunde Balogun", initials: "TB", course: "Data Structures & Algorithms", code: "CSC 301", payment: "Under review", approval: "Pending" },
  { student: "Mariam Yusuf", initials: "MY", course: "Database Systems", code: "CSC 305", payment: "Awaiting payment", approval: "Pending" },
  { student: "David Eze", initials: "DE", course: "Data Structures & Algorithms", code: "CSC 301", payment: "Verified", approval: "Pending" },
];

const offeredCourses = [
  { code: "CSC 301", title: "Data Structures & Algorithms", credits: 3 },
  { code: "CSC 305", title: "Database Systems", credits: 3 },
  { code: "CSC 312", title: "Human-Computer Interaction", credits: 2 },
];

export default function Dashboard() {
  const { role } = useParams();
  if (role !== "student" && role !== "lecturer" && role !== "admin") {
    return <Navigate to="/" replace />;
  }
  if (role === "lecturer") return <LecturerDashboard />;
  if (role === "admin") return <AdminDashboard />;
  return <StudentDashboard />;
}

function WorkspaceFrame({
  role,
  title,
  subtitle,
  children,
}: {
  role: "student" | "lecturer" | "admin";
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const nav = role === "student"
    ? [["Overview", "/student/dashboard"], ["My courses", "/student/dashboard#courses"], ["Payments", "/student/dashboard#courses"]]
    : role === "lecturer"
      ? [["Overview", "/lecturer/dashboard"], ["Student accounts", "/lecturer/dashboard#accounts"], ["Course registrations", "/lecturer/dashboard#registrations"]]
      : [["Overview", "/admin/dashboard"], ["Departments", "/admin/dashboard#departments"], ["Activity", "/admin/dashboard#activity"]];

  return (
    <div className="workspace">
      <aside className="workspace-sidebar">
        <Link className="brand" to="/"><span className="brand-mark">c</span><span>coursewise</span></Link>
        <div className="workspace-school"><span className="school-mark">N</span><span><b>Northbridge</b><small>UNIVERSITY PORTAL</small></span></div>
        <p className="sidebar-label">WORKSPACE</p>
        <nav className="workspace-nav" aria-label="Workspace navigation">
          {nav.map(([label, href], index) => (
            <a className={index === 0 ? "active" : ""} key={label} href={href}>
              <span className="nav-glyph">{["◫", "▤", "◷"][index]}</span>{label}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link to="/" className="help-link"><span>?</span> Help & support</Link>
          <Link to="/" className="profile-card">
            <span className="avatar avatar-small">{role === "student" ? "AO" : role === "lecturer" ? "JO" : "AD"}</span>
            <span><b>{role === "student" ? "Amina Okoro" : role === "lecturer" ? "Dr. James Obi" : "Admin user"}</b><small>{role[0].toUpperCase() + role.slice(1)}</small></span>
            <span className="profile-more">···</span>
          </Link>
          <Link to="/" className="signout-link">↪ <span>Sign out</span></Link>
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{title}</strong></div>
          <div className="topbar-actions">
            <span className="semester-pill"><i /> 2025 / 2026 · Semester 1</span>
            <button className="icon-button" aria-label="Notifications">♧<i /></button>
          </div>
        </header>
        <main className="workspace-content">
          <div className="page-title">
            <div><h1>{title}</h1><p>{subtitle}</p></div>
            <span className="preview-pill">PREVIEW WORKSPACE</span>
          </div>
          {children}
          <footer className="workspace-footer"><span>Coursewise · Northbridge University</span><span>Demo data is shown for preview purposes.</span></footer>
        </main>
      </div>
    </div>
  );
}

function StudentDashboard() {
  const [registeredCourses, setRegisteredCourses] = useState(["CSC 301"]);
  const [selectedCourse, setSelectedCourse] = useState("CSC 305");
  const [paymentSubmitted, setPaymentSubmitted] = useState<string[]>([]);
  const [paymentCourse, setPaymentCourse] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState("");
  const visibleCourses = offeredCourses.filter((course) => registeredCourses.includes(course.code));

  function registerCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextCourses = registeredCourses.includes(selectedCourse)
      ? registeredCourses
      : [...registeredCourses, selectedCourse];
    setRegisteredCourses(nextCourses);
    setSelectedCourse(offeredCourses.find((course) => !nextCourses.includes(course.code))?.code ?? "");
  }

  function submitPayment(event: React.FormEvent<HTMLFormElement>, courseCode: string) {
    event.preventDefault();
    setPaymentSubmitted((current) => [...current, courseCode]);
    setPaymentCourse(null);
    setPaymentReference("");
  }

  return (
    <WorkspaceFrame role="student" title="Good morning, Amina" subtitle="Here's your academic snapshot for this semester.">
      <section className="stat-grid">
        <StatCard label="Registered courses" value={String(visibleCourses.length).padStart(2, "0")} detail="of 6 recommended" icon="▤" tone="lavender" />
        <StatCard label="Credits this semester" value={String(visibleCourses.reduce((total, course) => total + course.credits, 0))} detail="Your current course load" icon="◷" tone="mint" />
        <StatCard label="Approvals" value="1 / 2" detail="One course still pending" icon="✓" tone="peach" />
      </section>

      <section className="workspace-columns" id="courses">
        <div className="panel course-panel">
          <div className="panel-heading">
            <div><h2>My course registration</h2><p>Register for courses and follow each review step.</p></div>
            <span className="count-pill">{visibleCourses.length} courses</span>
          </div>
          <div className="course-list">
            {visibleCourses.map((course) => {
              const submitted = paymentSubmitted.includes(course.code);
              return (
                <article className="course-row" key={course.code}>
                  <span className="course-monogram">{course.code.slice(-2)}</span>
                  <span className="course-info"><small>{course.code} · {course.credits} credits</small><strong>{course.title}</strong></span>
                  <span className="course-statuses">
                    <Badge tone={submitted ? "amber" : "green"}>{submitted ? "Payment under review" : course.code === "CSC 301" ? "Payment verified" : "Payment due"}</Badge>
                    <Badge tone={course.code === "CSC 301" ? "green" : "gray"}>{course.code === "CSC 301" ? "Approved" : "Approval pending"}</Badge>
                  </span>
                  {!submitted && course.code !== "CSC 301" && (paymentCourse === course.code ? (
                    <form className="payment-submit-form" onSubmit={(event) => submitPayment(event, course.code)}>
                      <input
                        aria-label={`Payment reference for ${course.code}`}
                        value={paymentReference}
                        onChange={(event) => setPaymentReference(event.target.value)}
                        placeholder="Enter payment reference"
                        required
                      />
                      <button className="button button-dark button-xs" type="submit">Submit for review</button>
                    </form>
                  ) : (
                    <button className="button button-outline button-xs" onClick={() => setPaymentCourse(course.code)}>Add payment reference</button>
                  ))}
                </article>
              );
            })}
            {visibleCourses.length === 0 && <p className="empty-state">No courses yet. Select a course below to get started.</p>}
          </div>
          <form className="register-course" onSubmit={registerCourse}>
            <label htmlFor="course-select">Add a course</label>
            <select id="course-select" value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)}>
              {offeredCourses.filter((course) => !registeredCourses.includes(course.code)).map((course) => (
                <option key={course.code} value={course.code}>{course.code} — {course.title}</option>
              ))}
              {offeredCourses.every((course) => registeredCourses.includes(course.code)) && <option value="">All available courses added</option>}
            </select>
            <button className="button button-dark button-xs" disabled={!selectedCourse}>Register course <span>+</span></button>
          </form>
        </div>

        <aside className="side-stack">
          <div className="panel next-step-panel">
            <span className="next-step-icon">✳</span>
            <p className="eyebrow">UP NEXT</p>
            <h3>Keep your semester moving.</h3>
            <p>Submit payment details for each registered course. Your lecturer will verify payment and approve your course registration separately.</p>
            <a href="#courses" className="text-link">Review my courses <span>→</span></a>
          </div>
          <div className="panel note-panel">
            <span className="note-icon">i</span>
            <span><strong>Two steps, two statuses</strong><small>Payment verification does not automatically approve your course registration.</small></span>
          </div>
        </aside>
      </section>
    </WorkspaceFrame>
  );
}

function LecturerDashboard() {
  const [activeTab, setActiveTab] = useState<"registrations" | "accounts">("registrations");
  const [registrations, setRegistrations] = useState(startingRegistrations);
  const [query, setQuery] = useState("");
  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.studentId}`.toLowerCase().includes(query.toLowerCase()),
  );

  function updateRegistration(index: number, field: "payment" | "approval") {
    setRegistrations((current) => current.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      return field === "payment"
        ? { ...item, payment: item.payment === "Verified" ? "Under review" : "Verified" }
        : { ...item, approval: item.approval === "Approved" ? "Pending" : "Approved" };
    }));
  }

  return (
    <WorkspaceFrame role="lecturer" title="Good morning, James" subtitle="Manage your department's student accounts and course registrations.">
      <section className="stat-grid">
        <StatCard label="Active department accounts" value="142" detail="Visible, online or offline" icon="◉" tone="lavender" />
        <StatCard label="Course registrations" value={String(registrations.length).padStart(2, "0")} detail="Across your courses" icon="▤" tone="mint" />
        <StatCard label="Awaiting review" value={String(registrations.filter((item) => item.payment !== "Verified" || item.approval !== "Approved").length).padStart(2, "0")} detail="Payment or approval pending" icon="◷" tone="peach" />
      </section>

      <section className="panel lecturer-panel">
        <div className="panel-heading lecturer-heading">
          <div><h2>Students & registrations</h2><p>Account visibility is separate from course-specific registration.</p></div>
          <button className="button button-outline button-xs" onClick={() => setActiveTab(activeTab === "accounts" ? "registrations" : "accounts")}>
            {activeTab === "accounts" ? "View course registrations" : "View student accounts"} <span>→</span>
          </button>
        </div>
        <div className="tab-bar" role="tablist" aria-label="Student views">
          <button role="tab" aria-selected={activeTab === "registrations"} className={activeTab === "registrations" ? "selected" : ""} onClick={() => setActiveTab("registrations")}>Course registrations <span>{registrations.length}</span></button>
          <button role="tab" aria-selected={activeTab === "accounts"} className={activeTab === "accounts" ? "selected" : ""} onClick={() => setActiveTab("accounts")}>Department accounts <span>142</span></button>
        </div>

        {activeTab === "accounts" ? (
          <>
            <div className="table-toolbar">
              <span><b>Activated accounts</b> · Computer Science</span>
              <label className="search-field"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search students" aria-label="Search students" /></label>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>DEPARTMENT</th><th>LAST ACTIVE</th><th>ACCOUNT</th></tr></thead>
                <tbody>{filteredStudents.map((student) => (
                  <tr key={student.studentId}>
                    <td><span className="table-person"><span className="avatar">{student.initials}</span><b>{student.name}</b></span></td>
                    <td>{student.studentId}</td><td>{student.department}</td><td>{student.lastSeen}</td>
                    <td><Badge tone="green">Active</Badge></td>
                  </tr>
                ))}</tbody>
              </table>
              {filteredStudents.length === 0 && <p className="empty-state">No students match that search.</p>}
            </div>
            <p className="table-footnote">Activated student accounts remain visible regardless of current online status. Registering for a course is a separate step.</p>
          </>
        ) : (
          <>
            <div className="table-toolbar"><span><b>My courses</b> · Current semester</span><span className="filter-pill">All courses⌄</span></div>
            <div className="table-scroll">
              <table className="registration-table">
                <thead><tr><th>STUDENT</th><th>COURSE</th><th>PAYMENT</th><th>COURSE APPROVAL</th><th>ACTIONS</th></tr></thead>
                <tbody>{registrations.map((registration, index) => (
                  <tr key={`${registration.student}-${registration.code}`}>
                    <td><span className="table-person"><span className="avatar">{registration.initials}</span><b>{registration.student}</b></span></td>
                    <td><b>{registration.code}</b><small className="table-subtitle">{registration.course}</small></td>
                    <td><Badge tone={registration.payment === "Verified" ? "green" : registration.payment === "Under review" ? "amber" : "gray"}>{registration.payment}</Badge></td>
                    <td><Badge tone={registration.approval === "Approved" ? "green" : "gray"}>{registration.approval}</Badge></td>
                    <td><div className="row-actions">
                      <button className="table-action" onClick={() => updateRegistration(index, "payment")}>{registration.payment === "Verified" ? "Undo payment" : "Verify payment"}</button>
                      <button className="table-action" onClick={() => updateRegistration(index, "approval")}>{registration.approval === "Approved" ? "Reopen" : "Approve"}</button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="table-footnote">Payment confirmation and academic approval are independent actions. Updating one does not change the other.</p>
          </>
        )}
      </section>
    </WorkspaceFrame>
  );
}

function AdminDashboard() {
  return (
    <WorkspaceFrame role="admin" title="Administration overview" subtitle="A high-level view of account and course activity across campus.">
      <section className="stat-grid">
        <StatCard label="Activated accounts" value="2,481" detail="Students across departments" icon="◉" tone="lavender" />
        <StatCard label="Course registrations" value="8,204" detail="For the current semester" icon="▤" tone="mint" />
        <StatCard label="Items to review" value="316" detail="Payments or approvals pending" icon="◷" tone="peach" />
      </section>
      <section className="workspace-columns admin-columns">
        <div className="panel" id="departments">
          <div className="panel-heading"><div><h2>Department overview</h2><p>Account totals and course registrations.</p></div><span className="count-pill">3 departments</span></div>
          <div className="department-list">
            {[
              ["Computer Science", "142 accounts", "486 registrations", "CS"],
              ["Business Administration", "186 accounts", "512 registrations", "BA"],
              ["Mass Communication", "97 accounts", "304 registrations", "MC"],
            ].map(([name, accounts, registrations, code]) => (
              <div className="department-row" key={code}><span className="course-monogram">{code}</span><span className="course-info"><strong>{name}</strong><small>{accounts}</small></span><span className="department-total">{registrations}</span><span className="feature-arrow">↗</span></div>
            ))}
          </div>
        </div>
        <aside className="panel admin-note" id="activity">
          <span className="next-step-icon">✳</span><p className="eyebrow">KEEP IN MIND</p><h3>Clear records, better decisions.</h3>
          <p>Account activation, course registration, payment verification, and academic approval are tracked as distinct milestones.</p>
          <div className="admin-legend"><Badge tone="green">Active account</Badge><Badge tone="amber">Payment review</Badge><Badge tone="gray">Approval pending</Badge></div>
        </aside>
      </section>
    </WorkspaceFrame>
  );
}

function StatCard({ label, value, detail, icon, tone }: { label: string; value: string; detail: string; icon: string; tone: string }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><p>{label}</p><strong>{value}</strong><small>{detail}</small></article>;
}

function Badge({ tone, children }: { tone: "green" | "amber" | "gray"; children: React.ReactNode }) {
  return <span className={`badge badge-${tone}`}><i />{children}</span>;
}
