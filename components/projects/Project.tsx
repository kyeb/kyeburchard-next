import ReactMarkdown from "react-markdown";
import { ProjectInfo } from "../../pages/projects";
import styles from "../../styles/ProjectsList.module.css";

interface ProjectProps {
  info: ProjectInfo;
}

const renderIcon = (icon: string) => {
  if (icon.startsWith("fa-")) {
    // Font Awesome icons
    return <i className={`fas ${icon}`} />;
  } else if (icon.endsWith(".svg")) {
    // SVG icons
    return null;
  } else {
    return null;
  }
};

const Project = (props: ProjectProps) => {
  const { name, content, icon } = props.info;
  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectHeader}>
        {icon && renderIcon(icon)}
        <h2>{name}</h2>
      </div>
      <ReactMarkdown className={styles.projectDescription}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Project;
