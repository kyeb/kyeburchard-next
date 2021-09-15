import matter from "gray-matter";

import { getPosts, ContentInfo } from "../lib/content";
import Layout from "../components/Layout";
import PostList from "../components/posts/PostList";

interface PostsPageProps {
  posts: ContentInfo[];
}

export interface PostInfo {
  name: string;
  title: string;
  excerpt?: string;
  date: Date;
  content: string;
}

const PostsPage = (props: PostsPageProps) => {
  const { posts } = props;
  const parsedProjects = posts
    .map(({ name, content }): PostInfo => {
      const parsed = matter(content);
      return {
        name,
        content: parsed.content,
        excerpt: parsed.data.excerpt,
        title: parsed.data.title,
        date: parsed.data.date,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Layout currentPage="posts">
      <PostList posts={parsedProjects} />
    </Layout>
  );
};

export const getStaticProps = async (): Promise<{
  props: PostsPageProps;
}> => {
  const content = await getPosts();
  return { props: { posts: content } };
};

export default PostsPage;
