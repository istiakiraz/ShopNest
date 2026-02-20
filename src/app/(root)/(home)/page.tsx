import { AdCard } from "@/app/components/Home/AdCard";
import AllProducts from "@/app/components/Home/AllProducts";
import Category from "@/app/components/Home/Category";
import { Discover } from "@/app/components/Home/Discover";
import Hero from "@/app/components/Home/Hero";

export default async function Home() {

  return (
    <main>
      <Hero></Hero>
      <Discover/>
      {/* <Category></Category> */}
      <AllProducts></AllProducts>
      <AdCard/>
    </main>
  );
}
