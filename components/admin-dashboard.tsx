"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdminPrincipal } from "@/lib/admin-auth";
import type { DashboardData } from "@/lib/admin-data";

const statusContext: Record<string, string> = {
  new: "Received",
  in_review: "Responded",
  closed: "Closed",
};
const eventLabel = (event: string) =>
  event.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(new Date(`${value.replace(" ", "T")}Z`))
    : "Never";

type EnquiryDetail = {
  id: number;
  kind: "talent" | "partner";
  kindContext: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  category: string;
  links: string;
  message: string;
  status: string;
  submissionId: string | null;
  notificationStatus: string;
  createdAt: string;
  statusContext: string;
  timeline: Array<{
    id: number;
    eventType: string;
    fromStatus: string | null;
    toStatus: string | null;
    emailSubject: string | null;
    emailText: string | null;
    emailStatus: string | null;
    createdAt: string;
  }>;
  nextStatus: "in_review" | "closed" | null;
  nextStatusContext: string | null;
  emailPreview: { subject: string; text: string; html: string } | null;
};

function Metric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <article className="admin-metric">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

function RecentEnquiries({ enquiries, onOpen, primary = false }: { enquiries: DashboardData["enquiries"]; onOpen: (id: number) => void; primary?: boolean }) {
  return <section className="admin-panel admin-enquiries">
    <div className="admin-panel-heading"><div><p className="admin-eyebrow">{primary ? "Primary workspace" : "Pipeline"}</p><h2>Recent enquiries</h2></div><span>{enquiries.length} latest · click a row to open</span></div>
    <div className="admin-table-wrap max-h-[30rem] overflow-y-auto overscroll-contain"><table><thead><tr><th className="sticky top-0 z-[1] bg-white">Contact</th><th className="sticky top-0 z-[1] bg-white">Context</th><th className="sticky top-0 z-[1] bg-white">Category</th><th className="sticky top-0 z-[1] bg-white">Received</th><th className="sticky top-0 z-[1] bg-white">Status</th></tr></thead><tbody>{enquiries.map((enquiry) => <tr key={enquiry.id} className="admin-enquiry-row" tabIndex={0} onClick={() => onOpen(enquiry.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(enquiry.id); } }}><td><strong>{enquiry.name}</strong><a href={`mailto:${enquiry.email}`} onClick={(event) => event.stopPropagation()}>{enquiry.email}</a></td><td>{enquiry.kindContext}</td><td>{enquiry.category}</td><td>{formatDate(enquiry.createdAt)}</td><td><span className={`admin-status-chip admin-status-${enquiry.status}`}><i />{statusContext[enquiry.status] || enquiry.status}</span></td></tr>)}</tbody></table>{!enquiries.length ? <p className="admin-empty">No enquiries have been received yet.</p> : null}</div>
  </section>;
}

export function AdminDashboard({
  user,
  data: initialData,
}: {
  user: AdminPrincipal;
  data: DashboardData;
}) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [busyStaff, setBusyStaff] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<number | null>(
    null,
  );
  const [enquiryDetail, setEnquiryDetail] = useState<EnquiryDetail | null>(
    null,
  );
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerError, setDrawerError] = useState("");
  const [confirmStatus, setConfirmStatus] = useState<
    "in_review" | "closed" | null
  >(null);
  const [transitionBusy, setTransitionBusy] = useState(false);
  const [rangeBusy, setRangeBusy] = useState<number | null>(null);
  const isSuper = user.role === "super_admin";
  const dateFormat = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
    [],
  );

  useEffect(() => {
    if (selectedEnquiryId === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEnquiryId(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyTouchAction: body.style.touchAction,
    };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.touchAction = "none";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.touchAction = previous.bodyTouchAction;
    };
  }, [selectedEnquiryId]);

  async function chooseRange(range: number) {
    if (rangeBusy !== null || range === data.range) return;
    setRangeBusy(range);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/overview?range=${range}`, {
        cache: "no-store",
      });
      const next = (await response.json()) as DashboardData & {
        error?: string;
      };
      if (!response.ok || next.error)
        throw new Error(next.error || "Unable to load this period.");
      setData(next);
      window.history.replaceState(null, "", `/admin?range=${range}`);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to load this period.",
      );
    } finally {
      setRangeBusy(null);
    }
  }
  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }
  async function openEnquiry(id: number) {
    setSelectedEnquiryId(id);
    setEnquiryDetail(null);
    setDrawerError("");
    setConfirmStatus(null);
    setDrawerLoading(true);
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        cache: "no-store",
      });
      const body = (await response.json()) as {
        enquiry?: EnquiryDetail;
        error?: string;
      };
      if (!response.ok || !body.enquiry)
        throw new Error(body.error || "Unable to load this enquiry.");
      setEnquiryDetail(body.enquiry);
    } catch (error) {
      setDrawerError(
        error instanceof Error ? error.message : "Unable to load this enquiry.",
      );
    } finally {
      setDrawerLoading(false);
    }
  }
  async function transitionEnquiry() {
    if (!enquiryDetail || !confirmStatus) return;
    setTransitionBusy(true);
    setDrawerError("");
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryDetail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: confirmStatus,
          expectedStatus: enquiryDetail.status,
        }),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        emailStatus?: string;
        error?: string;
      };
      if (!response.ok)
        throw new Error(body.error || "Unable to change this enquiry.");
      setData((previous) => ({
        ...previous,
        enquiries: previous.enquiries.map((item) =>
          item.id === enquiryDetail.id
            ? { ...item, status: confirmStatus }
            : item,
        ),
      }));
      setMessage(
        body.emailStatus === "sent"
          ? "Status changed and the enquiry email was sent."
          : "Status changed, but the enquiry email could not be sent.",
      );
      setConfirmStatus(null);
      await openEnquiry(enquiryDetail.id);
    } catch (error) {
      setDrawerError(
        error instanceof Error
          ? error.message
          : "Unable to change this enquiry.",
      );
    } finally {
      setTransitionBusy(false);
    }
  }
  async function updateStaff(
    id: number,
    update: { active?: boolean; role?: string },
  ) {
    setBusyStaff(id);
    setMessage("");
    const response = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...update }),
    });
    if (response.ok) {
      setData((previous) => ({
        ...previous,
        staff: previous.staff.map((item) =>
          item.id === id
            ? {
                ...item,
                ...update,
                active:
                  update.active === undefined
                    ? item.active
                    : Number(update.active),
              }
            : item,
        ),
      }));
      setMessage("Staff account updated.");
    } else {
      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setMessage(body?.error || "Unable to update the account.");
    }
    setBusyStaff(null);
  }
  async function createStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const fields = new FormData(form);
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fields.get("name"),
        email: fields.get("email"),
        password: fields.get("password"),
        role: fields.get("role"),
      }),
    });
    const body = (await response.json().catch(() => null)) as {
      user?: DashboardData["staff"][number];
      error?: string;
    } | null;
    if (response.ok && body?.user) {
      setData((previous) => ({
        ...previous,
        staff: [
          ...previous.staff,
          {
            ...body.user!,
            lastLoginAt: null,
            createdAt: new Date().toISOString(),
          },
        ],
      }));
      form.reset();
      setMessage(
        "Staff account created. Share the temporary password through a secure channel.",
      );
    } else setMessage(body?.error || "Unable to create the account.");
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">
            Big Fish Collective · {isSuper ? "Super admin" : "Admin"}
          </p>
          <h1>Operations dashboard</h1>
        </div>
        <div className="admin-header-actions">
          <span>{user.name}</span>
          <button onClick={signOut}>Sign out</button>
        </div>
      </header>
      <section
        className="admin-toolbar"
        aria-label="Dashboard period"
        aria-busy={rangeBusy !== null}
      >
        <div>
          {[7, 60, 90].map((range) => (
            <button
              key={range}
              onClick={() => void chooseRange(range)}
              disabled={rangeBusy !== null}
              className={data.range === range ? "is-active" : ""}
            >
              {rangeBusy === range ? "Loading…" : `${range} days`}
            </button>
          ))}
        </div>
        <p>Consent-based, aggregate site analytics</p>
      </section>
      {message ? (
        <p className="admin-notice" role="status">
          {message}
        </p>
      ) : null}
      {!isSuper ? <RecentEnquiries enquiries={data.enquiries} onOpen={(id) => void openEnquiry(id)} primary /> : null}
      <div className="admin-analytics-heading">
        <div>
          <p className="admin-eyebrow">Secondary view</p>
          <h2>Analytics & performance</h2>
        </div>
        <p className="max-w-md text-sm text-black/55">Use these signals to understand demand and follow-up performance after the enquiry pipeline is handled.</p>
      </div>
      <section className="admin-metrics-grid">
        <Metric
          label="Visitors"
          value={data.summary.visitors.toLocaleString("en-IN")}
          detail={`Last ${data.range} days`}
        />
        <Metric
          label="Unique visitors"
          value={data.summary.uniqueVisitors.toLocaleString("en-IN")}
          detail="Consent-based browser IDs"
        />
        <Metric
          label="Returning visitors"
          value={data.summary.returningVisitors.toLocaleString("en-IN")}
          detail="Seen before this period"
        />
        <Metric
          label="New enquiries"
          value={data.summary.leads}
          detail={`${data.summary.totalLeads} total stored leads`}
        />
        <Metric
          label="Visitor-to-lead rate"
          value={`${data.summary.conversionRate}%`}
          detail="Completed website forms"
        />
        <Metric
          label="Open pipeline"
          value={data.summary.openLeads}
          detail="New and in-review enquiries"
        />
      </section>
      <section className="admin-chart-grid">
        <article className="admin-panel admin-chart-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">Traffic</p>
              <h2>Visitors & enquiries</h2>
            </div>
          </div>
          <div className="admin-chart">
            <ResponsiveContainer width="100%" height={260} minWidth={0}>
              <LineChart data={data.traffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d7dbdf" />
                <XAxis
                  dataKey="day"
                  tickFormatter={(day) =>
                    dateFormat.format(new Date(`${day}T00:00:00Z`))
                  }
                  tick={{ fontSize: 11 }}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  labelFormatter={(day) =>
                    dateFormat.format(new Date(`${day}T00:00:00Z`))
                  }
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#111827"
                  strokeWidth={2}
                  dot={false}
                  name="Visitors"
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#d2572b"
                  strokeWidth={2}
                  dot={false}
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
        <article className="admin-panel admin-chart-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">Engagement</p>
              <h2>Intent signals</h2>
            </div>
          </div>
          <div className="admin-chart">
            <ResponsiveContainer width="100%" height={260} minWidth={0}>
              <BarChart data={data.traffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d7dbdf" />
                <XAxis
                  dataKey="day"
                  tickFormatter={(day) =>
                    dateFormat.format(new Date(`${day}T00:00:00Z`))
                  }
                  tick={{ fontSize: 11 }}
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  labelFormatter={(day) =>
                    dateFormat.format(new Date(`${day}T00:00:00Z`))
                  }
                />
                <Bar
                  dataKey="clicks"
                  fill="#d2572b"
                  radius={[3, 3, 0, 0]}
                  name="CTA clicks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
      <section className="admin-content-grid">
        <article className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">Discovery</p>
              <h2>Top pages</h2>
            </div>
          </div>
          <ol className="admin-ranked-list">
            {data.topPages.length ? (
              data.topPages.map((page, index) => (
                <li key={page.path}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{page.path}</strong>
                  <em>{page.visitors.toLocaleString("en-IN")} views</em>
                </li>
              ))
            ) : (
              <li className="admin-empty">
                No consented visitor data for this period.
              </li>
            )}
          </ol>
        </article>
        <article className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">Actions</p>
              <h2>Event breakdown</h2>
            </div>
          </div>
          <ul className="admin-event-list">
            {data.eventBreakdown.length ? (
              data.eventBreakdown.map((event) => (
                <li key={event.event}>
                  <span>{eventLabel(event.event)}</span>
                  <strong>{event.count.toLocaleString("en-IN")}</strong>
                </li>
              ))
            ) : (
              <li className="admin-empty">
                No engagement events for this period.
              </li>
            )}
          </ul>
        </article>
      </section>
      {isSuper ? <RecentEnquiries enquiries={data.enquiries} onOpen={(id) => void openEnquiry(id)} /> : null}
      {isSuper ? (
        <section className="admin-staff-section">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Access control</p>
              <h2>Admin accounts</h2>
              <p>
                Super admins have the same operational dashboard as admins plus
                account oversight and controls.
              </p>
            </div>
          </div>
          <div className="admin-staff-grid">
            <article className="admin-panel">
              <h3>Add staff account</h3>
              <form className="admin-create-user" onSubmit={createStaff}>
                <label>
                  Name
                  <input name="name" maxLength={100} required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required />
                </label>
                <label>
                  Temporary password
                  <input
                    name="password"
                    type="password"
                    minLength={16}
                    autoComplete="new-password"
                    required
                  />
                </label>
                <label>
                  Role
                  <select name="role" defaultValue="admin">
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super admin</option>
                  </select>
                </label>
                <button type="submit">Create account</button>
              </form>
            </article>
            <article className="admin-panel admin-staff-list">
              <h3>Access & activity</h3>
              {data.staff.map((staff) => (
                <div className="admin-staff-row" key={staff.id}>
                  <div>
                    <strong>{staff.name}</strong>
                    <span>
                      {staff.email} · {staff.role.replace("_", " ")}
                    </span>
                    <small>Last sign-in: {formatDate(staff.lastLoginAt)}</small>
                  </div>
                  <div>
                    {staff.id === user.id ? (
                      <span className="admin-current-user">
                        Current account
                      </span>
                    ) : (
                      <>
                        <button
                          disabled={busyStaff === staff.id}
                          onClick={() =>
                            void updateStaff(staff.id, {
                              active: !Boolean(staff.active),
                            })
                          }
                        >
                          {staff.active ? "Suspend" : "Restore"}
                        </button>
                        <button
                          disabled={busyStaff === staff.id}
                          onClick={() =>
                            void updateStaff(staff.id, {
                              role:
                                staff.role === "admin"
                                  ? "super_admin"
                                  : "admin",
                            })
                          }
                        >
                          Make {staff.role === "admin" ? "super" : "admin"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </article>
          </div>
        </section>
      ) : null}
      {isSuper ? (
        <article className="admin-panel admin-audit-log">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">Oversight</p>
              <h2>Recent admin activity</h2>
            </div>
          </div>
          <ul className="admin-event-list max-h-72 overflow-y-auto overscroll-contain pr-2">
            {data.activity.length ? (
              data.activity.map((item) => (
                <li key={item.id}>
                  <span>
                    <strong>{item.actorName || "System"}</strong> ·{" "}
                    {eventLabel(item.action)}
                    {item.target ? `: ${item.target}` : ""}
                  </span>
                  <small>{formatDate(item.createdAt)}</small>
                </li>
              ))
            ) : (
              <li className="admin-empty">
                Activity will appear after staff begin using the portal.
              </li>
            )}
          </ul>
        </article>
      ) : null}
      {selectedEnquiryId !== null ? (
        <EnquiryDrawer
          detail={enquiryDetail}
          loading={drawerLoading}
          error={drawerError}
          confirmStatus={confirmStatus}
          transitionBusy={transitionBusy}
          onClose={() => setSelectedEnquiryId(null)}
          onBeginTransition={setConfirmStatus}
          onCancelTransition={() => setConfirmStatus(null)}
          onConfirmTransition={() => void transitionEnquiry()}
        />
      ) : null}
    </main>
  );
}

function EnquiryDrawer({
  detail,
  loading,
  error,
  confirmStatus,
  transitionBusy,
  onClose,
  onBeginTransition,
  onCancelTransition,
  onConfirmTransition,
}: {
  detail: EnquiryDetail | null;
  loading: boolean;
  error: string;
  confirmStatus: "in_review" | "closed" | null;
  transitionBusy: boolean;
  onClose: () => void;
  onBeginTransition: (status: "in_review" | "closed") => void;
  onCancelTransition: () => void;
  onConfirmTransition: () => void;
}) {
  return (
    <>
      <button
        type="button"
        className="admin-drawer-backdrop"
        aria-label="Close enquiry details"
        onClick={onClose}
      />
      <aside
        className="admin-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry details"
      >
        <header className="admin-drawer-header">
          <div>
            <p className="admin-eyebrow">Enquiry detail</p>
            <h2>
              {detail?.name || (loading ? "Loading enquiry…" : "Enquiry")}
            </h2>
          </div>
          <button
            type="button"
            className="admin-drawer-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>
        {loading ? (
          <div className="admin-drawer-loading">
            Loading the complete form submission…
          </div>
        ) : error ? (
          <p className="admin-drawer-error" role="alert">
            {error}
          </p>
        ) : detail ? (
          <div className="admin-drawer-body">
            <div className="admin-drawer-summary">
              <span
                className={`admin-status-chip admin-status-${detail.status}`}
              >
                <i />
                {detail.statusContext}
              </span>
              <span>{detail.kindContext}</span>
              <span>{formatDate(detail.createdAt)}</span>
            </div>
            <section className="admin-drawer-section">
              <p className="admin-eyebrow">Contact</p>
              <dl className="admin-detail-grid">
                <div>
                  <dt>Name</dt>
                  <dd>{detail.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${detail.email}`}>{detail.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{detail.phone || "Not supplied"}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{detail.location}</dd>
                </div>
                <div>
                  <dt>
                    {detail.kind === "talent"
                      ? "Current representation"
                      : "Company or production"}
                  </dt>
                  <dd>{detail.company || "Not supplied"}</dd>
                </div>
                <div>
                  <dt>
                    {detail.kind === "talent"
                      ? "Primary discipline"
                      : "Project type"}
                  </dt>
                  <dd>{detail.category}</dd>
                </div>
              </dl>
            </section>
            <section className="admin-drawer-section">
              <p className="admin-eyebrow">Message</p>
              <p className="admin-drawer-message">{detail.message}</p>
            </section>
            <section className="admin-drawer-section">
              <p className="admin-eyebrow">Links</p>
              {detail.links ? (
                <div className="admin-drawer-links">
                  {detail.links.split(/[\s,]+/).map((link) => (
                    <a href={link} target="_blank" rel="noreferrer" key={link}>
                      {link}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="admin-muted">No links supplied.</p>
              )}
            </section>
            <section className="admin-drawer-section">
              <p className="admin-eyebrow">Timeline</p>
              <ol className="admin-timeline">
                {detail.timeline.map((event) => (
                  <li
                    key={event.id}
                    className={event.eventType === "closed" ? "is-current" : ""}
                  >
                    <span className="admin-timeline-dot" />
                    <div>
                      <strong>
                      {event.eventType === "received"
                        ? "Received"
                        : event.eventType === "responding" || event.eventType === "responded"
                          ? "Responded"
                          : "Closed"}
                      </strong>
                      <small>
                        {formatDate(event.createdAt)}
                        {event.emailStatus === "sent"
                          ? " · Email sent"
                          : event.emailStatus === "failed"
                            ? " · Email failed"
                            : ""}
                      </small>
                      {event.emailSubject ? <p>{event.emailSubject}</p> : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            {detail.nextStatus && detail.emailPreview ? (
              <section className="admin-drawer-action">
                <p className="admin-eyebrow">Next step</p>
                <h3>Move to {detail.nextStatusContext}</h3>
                <p>
                  This is a one-way transition. The submitter will receive the
                  email below.
                </p>
                <button
                  type="button"
                  className="admin-primary-action"
                  onClick={() => onBeginTransition(detail.nextStatus!)}
                >
                  Review email & move to {detail.nextStatusContext}
                </button>
              </section>
            ) : (
              <p className="admin-drawer-closed">
                This enquiry is closed. Status cannot be moved backwards.
              </p>
            )}
          </div>
        ) : null}
      </aside>
      {confirmStatus && detail?.emailPreview ? (
        <div className="admin-confirm-modal-backdrop" role="presentation">
          <section
            className="admin-confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-confirm-title"
          >
            <div className="admin-confirm-modal-header">
              <div>
                <p className="admin-eyebrow">Final confirmation</p>
                <h2 id="admin-confirm-title">Confirm and send this email?</h2>
              </div>
              <button
                type="button"
                className="admin-drawer-close"
                onClick={onCancelTransition}
                disabled={transitionBusy}
                aria-label="Close confirmation"
              >
                ×
              </button>
            </div>
            <div className="admin-confirm-modal-body">
              <p className="admin-confirm-recipient">
                To: <strong>{detail.email}</strong>
              </p>
              <p className="admin-email-subject">
                Subject: {detail.emailPreview.subject}
              </p>
              <iframe
                title="Email preview"
                className="admin-email-preview"
                srcDoc={detail.emailPreview.html}
                sandbox=""
              />
              <div className="admin-confirm-actions">
                <button
                  type="button"
                  onClick={onCancelTransition}
                  disabled={transitionBusy}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirmTransition}
                  disabled={transitionBusy}
                >
                  {transitionBusy
                    ? "Sending…"
                    : `Send & mark ${detail.nextStatusContext?.toLowerCase()}`}
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
