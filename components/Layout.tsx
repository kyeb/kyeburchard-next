import { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Layout.module.css";

const pages = [
  { name: "home", path: "/" },
  // { name: "about", path: "/about" },
  { name: "projects", path: "/projects" },
  { name: "posts", path: "/posts" },
] as const;

const pageNames = pages.map((el) => el.name);
type PageInfo = typeof pages[number];
type Page = typeof pageNames[number];

interface LayoutProps {
  currentPage: Page;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  const renderNavLink = (page: PageInfo) => {
    const isCurrent = props.currentPage === page.name;
    return (
      <span
        key={page.name}
        className={`${styles.navItem} ${isCurrent && styles.navItemCurrent}`}
      >
        <Link href={`${page.path}`}>{page.name}</Link>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Kye Burchard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        <div className={styles.leftContainer}>
          <nav className={styles.navContainer}>{pages.map(renderNavLink)}</nav>
        </div>
        <main className={styles.mainContainer}>
          <div className={styles.mainContent}>{props.children}</div>
        </main>
        <div className={styles.rightContainer}></div>
      </div>
    </>
  );
};

export default Layout;
