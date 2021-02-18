import { ProjectInfo } from "../../pages/projects";
import Project from "./Project";

interface ProjectsListProps {
  projects: ProjectInfo[];
}

const ProjectsList = (props: ProjectsListProps) => {
  return (
    <>
      <h3>some stuff I have worked on recently...</h3>
      <div>
        {props.projects.map((project) => (
          <Project info={project} key={project.name} />
        ))}
      </div>
    </>
  );
};

export default ProjectsList;
