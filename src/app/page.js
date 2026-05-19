import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedPets";
import WhyAdopt from "@/components/WhyAdopt";
import SuccessStories from "@/components/SuccessStories";
import PetCareTips from "@/components/PetCareTips";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedPets />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <Newsletter />
    </div>
  );
}