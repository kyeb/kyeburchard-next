import { ProjectInfo } from "../../pages/projects";

interface ProjectProps {
  info: ProjectInfo;
}

const Project = (props: ProjectProps) => {
  const { name, content, icon } = props.info;
  return (
    <>
      {name.replace(".md", "")}
      <p>{content}</p>
    </>
  );
};

export default Project;
