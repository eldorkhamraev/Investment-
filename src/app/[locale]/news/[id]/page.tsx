import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { ContactCta } from "@/components/home/contact-cta";
import { getNewsById } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getNewsById(id);
  if (!item) return { title: "News" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await getNewsById(id);
  if (!item) notFound();

  const hasBody =
    item.body &&
    typeof item.body === "object" &&
    "root" in (item.body as Record<string, unknown>);

  return (
    <>
      <article>
        <Section tone="paper" className="!pb-10">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-azure-700 hover:gap-2.5"
            >
              <Icons.arrow className="h-4 w-4 rotate-180" />
              All news
            </Link>
            <div className="mt-6 flex items-center gap-3">
              {item.tag ? <Badge tone="azure">{item.tag}</Badge> : null}
              <span className="text-sm text-slate">{item.date}</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl">{item.title}</h1>
          </div>

          {item.image ? (
            <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl shadow-lift">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[520px] w-full object-cover"
              />
            </div>
          ) : null}
        </Section>

        <Section tone="paper" className="!pt-0">
          <div className="prose-news mx-auto max-w-3xl">
            {hasBody ? (
              <RichText data={item.body as SerializedEditorState} />
            ) : (
              <p className="text-lg leading-relaxed text-steel">
                {item.excerpt}
              </p>
            )}
          </div>
        </Section>
      </article>
      <ContactCta />
    </>
  );
}
