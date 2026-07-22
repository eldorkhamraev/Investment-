"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ABOUT_STRUCTURE, type StructureNode } from "@/content/about";
import { PersonModal, type PersonProfile } from "./person-modal";

const PERSON_IDS = [
  "shermatov",
  "karimjonov",
  "maxsudov",
  "akramkhujaev",
  "gayratjonov",
  "inomjonova",
  "khakkiev",
  "khamrakulov",
] as const;

type PersonId = (typeof PERSON_IDS)[number];

function isPersonId(value: string | null): value is PersonId {
  return Boolean(value && (PERSON_IDS as readonly string[]).includes(value));
}

export function OfficeStructure() {
  const t = useTranslations("about.structure");
  const tp = useTranslations("about.people");
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState<PersonId | null>(null);

  const loadPerson = useCallback(
    (id: PersonId): PersonProfile => {
      const base = {
        id,
        name: tp(`${id}.name`),
        role: tp(`${id}.role`),
        unit: tp(`${id}.unit`),
        bio: tp(`${id}.bio`),
      };
      const phoneKey = `${id}.phone` as `${PersonId}.phone`;
      const emailKey = `${id}.email` as `${PersonId}.email`;
      const websiteKey = `${id}.website` as `${PersonId}.website`;
      const receptionKey = `${id}.reception` as `${PersonId}.reception`;

      return {
        ...base,
        phone: tp.has(phoneKey) ? tp(phoneKey) : undefined,
        email: tp.has(emailKey) ? tp(emailKey) : undefined,
        website: tp.has(websiteKey) ? tp(websiteKey) : undefined,
        reception: tp.has(receptionKey) ? tp(receptionKey) : undefined,
      };
    },
    [tp],
  );

  const people = useMemo(() => {
    const map = {} as Record<PersonId, PersonProfile>;
    for (const id of PERSON_IDS) {
      map[id] = loadPerson(id);
    }
    return map;
  }, [loadPerson]);

  useEffect(() => {
    const fromQuery = searchParams.get("person");
    if (isPersonId(fromQuery)) {
      setActiveId(fromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      if (detail?.id && isPersonId(detail.id)) {
        setActiveId(detail.id);
      }
    };
    window.addEventListener("about:open-person", onOpen);
    return () => window.removeEventListener("about:open-person", onOpen);
  }, []);

  const active = activeId ? people[activeId] : null;

  return (
    <>
      <p className="mb-8 text-sm text-steel">{t("clickHint")}</p>

      <div className="overflow-x-auto pb-2">
        <div className="mx-auto min-w-[300px] max-w-4xl">
          <StructureBranch
            node={ABOUT_STRUCTURE}
            label={(key) => t(`nodes.${key}` as "nodes.ministry")}
            onSelect={(personId) => {
              if (isPersonId(personId)) setActiveId(personId);
            }}
          />
        </div>
      </div>

      {active ? (
        <PersonModal person={active} onClose={() => setActiveId(null)} />
      ) : null}
    </>
  );
}

function StructureBranch({
  node,
  label,
  onSelect,
}: {
  node: StructureNode;
  label: (key: string) => string;
  onSelect: (personId: string) => void;
}) {
  const children = node.children ?? [];
  const clickable = Boolean(node.personId);

  return (
    <div className="flex flex-col items-center">
      {clickable ? (
        <button
          type="button"
          onClick={() => {
            if (node.personId) onSelect(node.personId);
          }}
          className={`min-w-[150px] max-w-[240px] border px-3 py-3 text-center text-[13px] font-semibold leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 ${
            node.kind === "role"
              ? "border-azure-600 bg-white text-navy-900 hover:bg-azure-50"
              : "border-line bg-white text-ink hover:border-azure-400 hover:bg-mist"
          }`}
        >
          {label(node.labelKey)}
        </button>
      ) : (
        <div
          className={`min-w-[150px] max-w-[260px] border px-3 py-3 text-center text-[13px] font-semibold leading-snug ${
            node.kind === "ministry"
              ? "border-navy-800 bg-navy-900 text-white"
              : node.kind === "unit"
                ? "border-azure-700 bg-azure-50 text-navy-900"
                : "border-line bg-white text-ink"
          }`}
        >
          {label(node.labelKey)}
        </div>
      )}

      {children.length > 0 ? (
        <>
          <div className="h-5 w-px bg-line" aria-hidden />
          {children.length === 1 ? (
            <StructureBranch
              node={children[0]}
              label={label}
              onSelect={onSelect}
            />
          ) : (
            <div className="w-full">
              <div className="relative mx-auto max-w-full">
                <div
                  className="absolute left-[12.5%] right-[12.5%] top-0 hidden h-px bg-line sm:block"
                  aria-hidden
                />
                <div
                  className={`grid gap-5 ${
                    children.length === 2
                      ? "sm:grid-cols-2"
                      : children.length === 3
                        ? "sm:grid-cols-3"
                        : "sm:grid-cols-2 lg:grid-cols-4"
                  }`}
                >
                  {children.map((child) => (
                    <div key={child.id} className="flex flex-col items-center">
                      <div className="hidden h-5 w-px bg-line sm:block" aria-hidden />
                      <StructureBranch
                        node={child}
                        label={label}
                        onSelect={onSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
