import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.picOuterContainer}>
        <div className={styles.picContainer}>
          <img
            className={styles.pic}
            src="/kye-nyc.jpg"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
      <div className={styles.intro}>
        <h1>Hey! I'm Kye.</h1>
      </div>
      <div className={styles.content}>
        <p>
          I'm currently a staff engineer at Stripe, running a high-throughput
          service with an SLO of 99.9999% uptime and building the
          next-generation API platform for building scalable, performant, and
          reliable REST and GraphQL APIs.
        </p>
        <p>
          Before that, I was a full-stack engineer, optimizing performance,
          pushing the boundaries of reliability, driving code quality, and
          working on other platform-shaped problems across a massive React
          application and Ruby backend. I'm a recent graduate from MIT (course
          6-2), a tech enthusiast, and an optimist with a passion for learning.
        </p>
        <p>
          Previously, I led the Logistics team for a 1500 person hackathon
          (HackMIT), served as treasurer, then president, then tech chair of
          Maseeh Hall (MIT's largest dorm), interned at Microsoft and Stripe,
          and worked as an undergrad researcher at the MIT Media Lab.
        </p>
        <p>
          I love being outdoors whenever I can find time — whether that means
          skiing at Arapahoe Basin, gravel bikepacking along the California
          coastline, backpacking the John Muir Trail, exploring wherever I
          happen to be at the moment, or just finding a spot outside to walk or
          chill with a good book or podcast.
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
        <a className={styles.link} href="/kyeb_resume.pdf">
          <i className="fas fa-file-alt" />
        </a>
      </div>
    </div>
  );
};

export default About;
