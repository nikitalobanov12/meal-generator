import Image from "next/image";
import RandomMealGenerator from "./components/randomMealGenerator";

export default function Home() {
  return (
   <div >
    <div className="mx-auto items-center text-center">
   <h1 className="text-7xl text-gray-50 font-semibold my-8 mx-4">Feeling Hungry?</h1>
   <h3 className="text-2xl text-gray-100 font-semibold my-4 mx-4">Generate a Random Meal by Clicking Below</h3>
   </div>
   <RandomMealGenerator/>
   </div>
  );
}
