import { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Layout.module.css";

const pages = [
  { name: "about", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "posts", path: "/posts" },
  { name: "", path: "/empty" },
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
    const empty = page.name === "";
    return (
      <span
        key={page.name}
        className={`${styles.navItem} ${isCurrent && styles.navItemCurrent} ${
          empty && styles.hidden
        }`}
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
        <main
          className={`${styles.mainContainer} ${
            props.currentPage === "" && styles.hidden
          }`}
        >
          {props.children}
        </main>
        <div></div>
      </div>
    </>
  );
};

export default Layout;
