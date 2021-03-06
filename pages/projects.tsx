import matter from "gray-matter";

import { CONTENT_REPO } from "../lib/constants";
import getContent, { ContentInfo } from "../lib/content";
import Layout from "../components/Layout";
import ProjectsList from "../components/projects/ProjectsList";

interface ProjectsPageProps {
  projects: ContentInfo[];
}

export interface ProjectInfo {
  name: string;
  icon: string;
  content: string;
}

const ProjectsPage = (props: ProjectsPageProps) => {
  const { projects } = props;
  // TODO: parse markdown matter for info
  const parsedProjects = projects.map((project) => {
    const parsed = matter(project.content);
    return {
      name: parsed.data.name,
      icon: parsed.data.icon,
      content: parsed.content,
    };
  });
  return (
    <Layout currentPage="projects">
      <ProjectsList projects={parsedProjects} />
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: ProjectsPageProps;
}> => {
  const content = await getContent(CONTENT_REPO, "projects");
  return { props: { projects: content } };
};

export default ProjectsPage;
