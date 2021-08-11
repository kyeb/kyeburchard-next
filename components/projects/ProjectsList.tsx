import { ProjectInfo } from "../../pages/projects";
import Project from "./Project";
import styles from "../../styles/ProjectsList.module.css";

interface ProjectsListProps {
  projects: ProjectInfo[];
}

const ProjectsList = (props: ProjectsListProps) => {
  return (
    <>
      <h1 className={styles.header}>stuff i have done recently</h1>
      <div>
        {props.projects.map((project) => (
          <Project info={project} key={project.name} />
        ))}
      </div>
    </>
  );
};

export default ProjectsList;
