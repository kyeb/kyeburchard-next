import Layout from "../components/Layout";
import About from "../components/About";

const Homepage = () => {
  return (
    <Layout currentPage="home">
      <About />
    </Layout>
  );
};

export default Homepage;
