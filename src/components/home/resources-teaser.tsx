import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function ResourcesTeaser() {
  return (
    <Section tone="ink">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <SectionHeading
          tone="dark"
          eyebrow="Resources"
          title="Guides, decks and programme one-pagers."
          intro="Download the office presentation or browse how-to-invest checklists, IT Park summaries and strategy highlights."
        />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/resources" variant="on-dark">
            Open library
            <Icons.arrow className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink
            href="/investment-presentation.pdf"
            variant="on-dark"
            target="_blank"
          >
            Presentation PDF
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
