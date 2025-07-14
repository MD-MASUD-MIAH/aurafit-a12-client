import Hero from "../components/Hero";
import { PageName } from "../components/PageName";
import About from "./About";
import Feature from "./Feature";
import FeaturedClasses from "./FeaturedClasses";
import NewLatter from "./NewLatter";
import TeamPost from "./TeamPost";
import Testimonials from "./Testimonials";
import TrainerTeam from "./TrainerTeam";

const Home = () => {

  PageName('Home')
  return (
    <div>
      <Hero></Hero>
      <Feature></Feature>
      <About></About>
      <FeaturedClasses></FeaturedClasses>
      <TrainerTeam></TrainerTeam>
      <Testimonials></Testimonials>
      <NewLatter></NewLatter>
      <TeamPost></TeamPost>
    </div>
  );
};

export default Home;
