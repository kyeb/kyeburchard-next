import ReactMarkdown from "react-markdown";
import { ProjectInfo } from "../../pages/projects";
import styles from "../../styles/ProjectsList.module.css";
import contentStyles from "../../styles/Content.module.css";

interface ProjectProps {
  info: ProjectInfo;
}

const renderIcon = (icon: string) => {
  if (icon.startsWith("fa-")) {
    // Font Awesome icons
    return <i className={`fas ${icon}`} />;
  } else if (icon.endsWith(".png") || icon.endsWith(".svg")) {
    // SVG/PNG icons
    return (
      <div className={styles.projectIconImageContainer}>
        <img className={styles.projectIconImage} src={`/icons/${icon}`} />
      </div>
    );
  } else {
    return null;
  }
};

const Project = (props: ProjectProps) => {
  const { name, content, icon } = props.info;
  return (
    <div>
      <div className={styles.projectHeader}>
        {icon && renderIcon(icon)}
        <h2>{name}</h2>
      </div>
      <ReactMarkdown
        className={`${styles.projectDescription} ${contentStyles.content}`}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Project;
