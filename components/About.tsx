import Image from "next/image";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.picOuterContainer}>
        <div className={styles.picContainer}>
          <Image
            className={styles.pic}
            src="/kye-nyc.jpg"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className={styles.intro}>
        <h1>Hey! I'm Kye.</h1>
      </div>
      <div className={styles.content}>
        <p>
          I'm a recent grad from MIT (course 6-2), a tech enthusiast, and an
          optimist with a passion for learning. Recently, I've been relaxing and
          working on this website. I'm always looking for something new to
          learn!
        </p>
        <p>
          Now, I'm working as a full-stack engineer at Stripe, optimizing
          performance, handling frontend analytics, driving migrations, and
          working on other platform-shaped problems across a massive React
          application and Ruby backend.
        </p>
        <p>
          Previously, I led the Logistics team for HackMIT, served as treasurer,
          then president, then WebTech chair of Maseeh Hall (MIT's largest
          dorm), interned at Microsoft and Stripe, and worked as an undergrad
          researcher at the MIT Media Lab.
        </p>
        <p>
          I love being outdoors whenever I can find time — whether that means
          skiing, mountain biking, and hiking, exploring whatever area I'm
          living in, or just finding a spot outside to walk or sit down with a
          good book/podcast.
        </p>
      </div>
      <div className={styles.links}>
        <a className={styles.link} href="https://github.com/kyeb/">
          <i className="fab fa-github" />
        </a>
        <a className={styles.link} href="https://twitter.com/kyeburchard">
          <i className="fab fa-twitter" />
        </a>
        <a className={styles.link} href="mailto:kyeb@mit.edu">
          <i className="fas fa-envelope" />
        </a>
        <a className={styles.link} href="/resume_kye.pdf">
          <i className="fas fa-file-alt" />
        </a>
      </div>
    </div>
  );
};

export default About;
