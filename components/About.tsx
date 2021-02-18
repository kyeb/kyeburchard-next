import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.picContainer}>
        <div className={styles.pic} />
      </div>
      <div className={styles.intro}>
        <h1>Hey! I'm Kye.</h1>
      </div>
      <div className={styles.content}>
        <p>
          I'm a recent grad from MIT (Course 6-2), a tech enthusiast, and an
          optimist with a passion for learning. Recently, I've been working on
          school projects and this website.
        </p>
        <p>
          Soon, I'll be starting as a full time engineer at Stripe, optimizing
          their dashboard performance!
        </p>
        <p>
          Previously, I led the Logistics team for HackMIT, served as treasurer,
          then president, then WebTech chair of Maseeh Hall, MIT's largest dorm,
          interned at Microsoft and Stripe, and worked as an undergrad
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
        <i className="fab fa-github" />
      </div>
    </div>
  );
};

export default About;
