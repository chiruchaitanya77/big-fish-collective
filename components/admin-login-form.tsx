"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        setError(body?.error || "Unable to sign in.");
        return;
      }
      router.replace(returnTo);
    } catch {
      setError("Unable to sign in. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return <form onSubmit={submit} className="admin-login-form">
    <label>Email<input name="email" type="email" autoComplete="username" required /></label>
    <label>Password<input name="password" type="password" autoComplete="current-password" minLength={16} required /></label>
    {error ? <p className="admin-form-error" role="alert">{error}</p> : null}
    <button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in securely"}</button>
  </form>;
}
