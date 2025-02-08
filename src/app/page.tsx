"use client";

import ProductsPage from "@/components/home/products-page";
import SideNav from "@/components/home/side-nav"
import { useFetch } from "@/hooks/useFetch";
import { Category } from "@/types/definitions";
import { useState } from "react";

export default function Home() {
  // state to store selected category
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // fetch categories
  const { loading, data, error } = useFetch<{ data: { data: Category[] } }>("/api/filter-category");
  const categories = data?.data?.data ?? null;

  const updateSelectedCategory = (category: Category) => {
    setSelectedCategory((prev) => {
      // if same remove selected category
      if (prev && prev._id === category._id) {
        localStorage.removeItem("selectedCategory");
        return null;
      }
      // else set selected category
      localStorage.setItem("selectedCategory", JSON.stringify(category));
      return category;
    })
  };

  return (
    <>
      {/* ------------------------------ Error message ----------------------------- */}
      {
        error && <div className="text-center text-red-500">{error.message}</div>
      }
      <div className="flex flex-col sm:flex-row gap-4 p-4 relative">
        {/* --------------------- left side menu with categories --------------------- */}
        <SideNav loading={loading} categories={categories} selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory} />

        <div className="w-full overflow-y-auto max-h-[calc(100vh-7rem)]">
          {/* ------------------------------ Products ----------------------------- */}
          <ProductsPage selectedCategory={selectedCategory} />
        </div>
      </div>

    </>
  )
}

