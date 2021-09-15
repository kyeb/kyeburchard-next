import styles from "../../styles/Posts.module.css";
import Post from "./Post";
import { PostInfo } from "../../pages/posts";

interface PostsProps {
  posts: PostInfo[];
}

const Project = (props: PostsProps) => {
  return (
    <>
      {props.posts.map((post) => (
        <Post post={post} key={post.name} />
      ))}
    </>
  );
};

export default Project;
