import { HeroAtmosphere } from "@/components/ui/hero-atmosphere";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <HeroAtmosphere
        showOrbit={!image}
        media={
          image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : undefined
        }
      />
      <div className="container-edge relative py-20 md:py-28">
        <span className="eyebrow !text-azure-300">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] text-white md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-azure-100/80">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
