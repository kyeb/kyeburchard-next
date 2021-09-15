import ReactMarkdown from "react-markdown";
import styles from "../../styles/PostList.module.css";
import contentStyles from "../../styles/Content.module.css";
import { PostInfo } from "../../pages/posts";

interface PostProps {
  post: PostInfo;
}

const Project = ({ post }: PostProps) => {
  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      {post.excerpt && <h2>{post.excerpt}</h2>}
      <p className={styles.date}>{post.date.toDateString()}</p>
      <div className={contentStyles.content}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Project;
