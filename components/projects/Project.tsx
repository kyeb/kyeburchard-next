import { ProjectInfo } from "../../pages/projects";

interface ProjectProps {
  info: ProjectInfo;
}

const Project = (props: ProjectProps) => {
  const { info } = props;
  const { name, content } = info;
  return (
    <>
      {name.replace(".md", "")}
      {content}
    </>
  );
};

export default Project;
