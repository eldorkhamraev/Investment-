import { Link } from "@/i18n/navigation";

/** Minimal press-release contact panel (UzNIF-style). */
export function ArticleSidebar({
  contactTitle,
  emailLabel,
  phoneLabel,
  addressLabel,
  contactLinkLabel,
  email,
  phone,
  address,
}: {
  contactTitle: string;
  emailLabel: string;
  phoneLabel: string;
  addressLabel: string;
  contactLinkLabel: string;
  email: string;
  phone: string;
  address: string;
}) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="border border-line bg-white p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-azure-700">
          {contactTitle}
        </p>

        <dl className="mt-4 space-y-3.5 text-sm">
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate">
              {emailLabel}
            </dt>
            <dd className="mt-0.5">
              <a
                href={`mailto:${email}`}
                className="text-ink transition-colors hover:text-azure-700"
              >
                {email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate">
              {phoneLabel}
            </dt>
            <dd className="mt-0.5">
              <a
                href={`tel:${phone.replace(/[\s-]/g, "")}`}
                className="text-ink transition-colors hover:text-azure-700"
              >
                {phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate">
              {addressLabel}
            </dt>
            <dd className="mt-0.5 leading-relaxed text-steel">{address}</dd>
          </div>
        </dl>

        <p className="mt-5 border-t border-line pt-4">
          <Link
            href="/contact"
            className="text-sm font-semibold text-azure-700 hover:underline"
          >
            {contactLinkLabel}
          </Link>
        </p>
      </div>
    </aside>
  );
}
