import { Hero } from "@/components/Hero";
import { FeaturedDishes } from "@/components/FeaturedDishes";
import { WhyNebula } from "@/components/WhyNebula";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="featured">
          <FeaturedDishes />
        </section>
        <section id="about">
          <WhyNebula />
        </section>
      </main>
    </div>
  );
};

export default Index;
