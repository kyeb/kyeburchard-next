import Layout from "../components/Layout";
import About from "../components/About";

const Homepage = () => {
  return (
    <Layout currentPage="about">
      <About />
    </Layout>
  );
};

export default Homepage;
