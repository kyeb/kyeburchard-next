import { promises as fs } from "fs";
import path from "path";
import { CONTENT_REPO } from "./constants";

export interface ContentInfo {
  name: string;
  content: string;
}

interface GitHubContentInfo {
  type: "file" | "dir" | "symlink";
  name: string;
  download_url: string;
}

interface GitHubError {
  message: string;
}

const getGitHubContent = async (
  repo: string,
  dir: string
): Promise<ContentInfo[]> => {
  const res = await fetch(
    `https://api.github.com/repos/kyeb/${repo}/contents/${dir}`
  );
  const contentInfo: GitHubContentInfo[] | GitHubError = await res.json();
  if (!Array.isArray(contentInfo)) {
    console.error(contentInfo.message);
    return [];
  }

  const contentPromises = contentInfo
    .filter((item) => item.type === "file")
    .map((item) => fetch(item.download_url));

  const allResponses = await Promise.all(contentPromises);
  const allContent = await Promise.all(allResponses.map((res) => res.text()));

  return allContent.map((item, i) => ({
    name: contentInfo[i].name,
    content: item,
  }));
};

const getLocalContent = async (dir: string): Promise<ContentInfo[]> => {
  const contentDir = path.join(process.cwd(), "content", dir);
  const contentPaths = await fs.readdir(contentDir);

  const contentPromises = contentPaths.map(async (fileName) => {
    const filePath = path.join(contentDir, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    return { name: fileName, content: fileContent };
  });

  return Promise.all(contentPromises);
};

export const getProjects = async (): Promise<ContentInfo[]> => {
  return getLocalContent("projects");
};

export const getPosts = async () => {
  return getLocalContent("posts");
};
