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

const getContent = async (
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

export default getContent;
