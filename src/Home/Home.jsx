import Hero from "../components/Hero";
import About from "./About";
import Feature from "./Feature";
import FeaturedClasses from "./FeaturedClasses";
import NewLatter from "./NewLatter";
import TeamPost from "./TeamPost";
import Testimonials from "./Testimonials";
import TrainerTeam from "./TrainerTeam";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Feature></Feature>
      <About></About>
      <FeaturedClasses></FeaturedClasses>
      <Testimonials></Testimonials>
      <TeamPost></TeamPost>
      <NewLatter></NewLatter>
      <TrainerTeam></TrainerTeam>
    </div>
  );
};

export default Home;
