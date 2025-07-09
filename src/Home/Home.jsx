import Hero from "../components/Hero";
import About from "./About";
import Feature from "./Feature";
import NewLatter from "./NewLatter";
import TeamPost from "./TeamPost";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Feature></Feature>
      <About></About>
      <Testimonials></Testimonials>
      <TeamPost></TeamPost>
      <NewLatter></NewLatter>
    </div>
  );
};

export default Home;
