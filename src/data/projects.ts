export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Hero image URL. Until real imagery lands, `heroTint` paints the hero. */
  hero?: string;
  heroTint: [string, string];
  sections: ProjectSection[];
};

export const projects: Record<string, Project> = {
  "project-one": {
    slug: "project-one",
    title: "Project",
    summary: "Case study placeholder. Real title, hero and story coming soon.",
    heroTint: ["#ffd778", "#f5f5f5"],
    sections: [
      { heading: "Context", body: "Placeholder: the problem and why it mattered." },
      { heading: "Approach", body: "Placeholder: how the team got there." },
      { heading: "Outcome", body: "Placeholder: what shipped and what changed." },
    ],
  },
  "project-two": {
    slug: "project-two",
    title: "Project",
    summary: "Case study placeholder. Real title, hero and story coming soon.",
    heroTint: ["#d5d5d5", "#ffd778"],
    sections: [
      { heading: "Context", body: "Placeholder: the problem and why it mattered." },
      { heading: "Approach", body: "Placeholder: how the team got there." },
      { heading: "Outcome", body: "Placeholder: what shipped and what changed." },
    ],
  },
};

export function getProject(slug: string | undefined): Project | undefined {
  return slug ? projects[slug] : undefined;
}
