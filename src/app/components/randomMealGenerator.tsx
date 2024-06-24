"use client";
import React, { useState } from 'react';
import Image from 'next/image';
type Meal = {
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    [key: string]: any; // For dynamic ingredient keys
  };
  
  const RandomMealGenerator: React.FC = () => {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchRandomMeal = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        if (data.meals) {
          setMeal(data.meals[0]);
        } else {
          setError('No meal found');
        }
      } catch (err) {
        setError('Failed to fetch meal');
      } finally {
        setLoading(false);
      }
    };
  
    const getIngredients = () => {
      if (!meal) return [];
      let ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      return ingredients;
    };
  
    return (
      <div className="p-4 text-center mx-auto">
        <button
          onClick={fetchRandomMeal}
          disabled={loading}
          className="px-4 py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition-all hover:scale-95"
        >
          {loading ? 'Loading...' : 'Get Random Meal'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {meal && (
          <div className="mt-4 p-4 lg:px-16  rounded shadow-lg text-left">
            <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
           <div className="grid 2xl:grid-cols-3 2xl:space-x-20 space-y-8 2xl:space-y-0">
             <Image width={1000} height={1000} src={meal.strMealThumb} alt={meal.strMeal} className="w-auto h-auto max-w-[500px] rounded mb-4" />
          <div className=' col-span-2 ' > <p className="mb-4"><strong>Instructions:</strong> {meal.strInstructions}</p>
            <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc pl-5 mb-4">
              {getIngredients().map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            </div> 
           </div> 
           <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>
            {meal.strYoutube && (
              <p className="mt-4">
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Watch Video Recipe
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default RandomMealGenerator;