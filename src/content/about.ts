/**
 * Investment Project Office organisational structure.
 * Node labels and person profiles are localised in messages under `about.structure` / `about.people`.
 */

export type StructureNodeKind = "ministry" | "role" | "unit" | "person";

export type StructureNode = {
  id: string;
  /** Translation key under `about.structure.nodes` */
  labelKey: string;
  kind: StructureNodeKind;
  /** Person profile id under `about.people` — makes the node clickable */
  personId?: string;
  children?: StructureNode[];
};

export const ABOUT_STRUCTURE: StructureNode = {
  id: "ministry",
  labelKey: "ministry",
  kind: "ministry",
  children: [
    {
      id: "minister",
      labelKey: "minister",
      kind: "role",
      personId: "shermatov",
      children: [
        {
          id: "deputy-karimjonov",
          labelKey: "deputyMinister",
          kind: "role",
          personId: "karimjonov",
          children: [
            {
              id: "ipo",
              labelKey: "ipo",
              kind: "unit",
              children: [
                {
                  id: "head",
                  labelKey: "head",
                  kind: "role",
                  personId: "akramkhujaev",
                  children: [
                    {
                      id: "gayratjonov",
                      labelKey: "officerGrants",
                      kind: "person",
                      personId: "gayratjonov",
                    },
                    {
                      id: "inomjonova",
                      labelKey: "officerSenior",
                      kind: "person",
                      personId: "inomjonova",
                    },
                    {
                      id: "khakkiev",
                      labelKey: "officerProjects",
                      kind: "person",
                      personId: "khakkiev",
                    },
                    {
                      id: "khamrakulov",
                      labelKey: "officerMinistry",
                      kind: "person",
                      personId: "khamrakulov",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "deputy-maxsudov",
          labelKey: "deputyMinister",
          kind: "role",
          personId: "maxsudov",
        },
      ],
    },
  ],
};

/** Ordered list of person ids for the Team section */
export const ABOUT_TEAM_IDS = [
  "akramkhujaev",
  "karimjonov",
  "gayratjonov",
  "inomjonova",
  "khakkiev",
  "khamrakulov",
] as const;

export type AboutPersonId = (typeof ABOUT_TEAM_IDS)[number] | "shermatov" | "maxsudov";
