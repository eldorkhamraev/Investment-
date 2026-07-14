"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const options = t.raw("interestOptions") as string[];
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate/70 focus:border-azure-400 focus:outline-none focus:ring-2 focus:ring-azure-200";

  if (sent) {
    return (
      <div className="rounded-2xl border border-azure-200 bg-azure-50 p-8 text-center">
        <p className="font-display text-lg font-bold text-ink">
          {t("successTitle")}
        </p>
        <p className="mt-2 text-sm text-steel">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-steel">
            {t("name")}
          </span>
          <input required className={field} type="text" name="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-steel">
            {t("email")}
          </span>
          <input required className={field} type="email" name="email" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-steel">
            {t("company")}
          </span>
          <input className={field} type="text" name="company" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-steel">
            {t("country")}
          </span>
          <input className={field} type="text" name="country" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-steel">
          {t("interest")}
        </span>
        <select className={field} name="interest" defaultValue={options[0]}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-steel">
          {t("message")}
        </span>
        <textarea required rows={5} className={field} name="message" />
      </label>
      <Button
        type="submit"
        size="lg"
        variant="secondary"
        disabled={submitting}
        className="w-full sm:w-auto"
      >
        {submitting ? t("submitting") : t("submit")}
      </Button>
      {error ? (
        <p className="text-sm font-medium text-red-600">{t("error")}</p>
      ) : null}
      <p className="text-xs text-slate">{t("note")}</p>
    </form>
  );
}
