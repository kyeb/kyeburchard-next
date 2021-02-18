import { CONTENT_REPO } from "../components/constants";
import getContent, { ContentInfo } from "../components/content";
import Layout from "../components/Layout";

interface PostsPageProps {
  posts: ContentInfo[];
}

export interface PostInfo {
  name: string;
  image: string;
  content: string;
}

const PostsPage = (props: PostsPageProps) => {
  const { posts } = props;
  // TODO: parse markdown matter for info
  const parsedPosts = posts.map((post) => ({
    icon: "todo",
    content: post.content,
    name: post.name,
  }));
  return (
    <Layout currentPage="posts">{/* <Posts posts={parsedPosts} /> */}</Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: PostsPageProps;
}> => {
  const content = await getContent(CONTENT_REPO, "test");
  return { props: { posts: content } };
};

export default PostsPage;
