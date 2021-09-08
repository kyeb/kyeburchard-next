import matter from "gray-matter";

import { getProjects, ContentInfo } from "../lib/content";
import Layout from "../components/Layout";
import ProjectsList from "../components/projects/ProjectsList";

interface ProjectsPageProps {
  projects: ContentInfo[];
}

export interface ProjectInfo {
  name: string;
  icon?: string;
  content: string;
  order: number;
  action: string;
  url: string;
}

const ProjectsPage = (props: ProjectsPageProps) => {
  const { projects } = props;
  const parsedProjects = projects
    .map(({ content }): ProjectInfo => {
      const parsed = matter(content);
      return {
        name: parsed.data.name,
        icon: parsed.data.icon,
        content: parsed.content,
        order: parsed.data.order,
        action: parsed.data.action,
        url: parsed.data.url,
      };
    })
    .sort((a, b) => a.order - b.order);

  return (
    <Layout currentPage="projects">
      <ProjectsList projects={parsedProjects} />
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: ProjectsPageProps;
}> => {
  const content = await getProjects();
  return { props: { projects: content } };
};

export default ProjectsPage;
