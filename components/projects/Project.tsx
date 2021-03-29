import ReactMarkdown from "react-markdown";

import { ProjectInfo } from "../../pages/projects";

interface ProjectProps {
  info: ProjectInfo;
}

const Project = (props: ProjectProps) => {
  const { name, content, icon } = props.info;
  return (
    <>
      <i className={`fas fa-${icon}`} />
      <h2>{name}</h2>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  );
};

export default Project;
