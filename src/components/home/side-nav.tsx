"use client";
import Image from "next/image";
import { Category } from "@/types/definitions";
import clsx from "clsx";
import CategoriesSkeleton from "../skeletons/categories-loding";

interface PropsTypes {
    selectedCategory: Category | null;
    updateSelectedCategory: (category: Category) => void;
    loading: boolean;
    categories: Category[] | null;
}

export default function SideNav({ selectedCategory, updateSelectedCategory, loading, categories }: PropsTypes) {
    return (
        <aside className="w-full sm:w-56">
            <nav className="bg-muted/30 rounded-lg p-3">
                <ul className="w-full flex flex-wrap gap-2">
                    {loading ? (
                        <CategoriesSkeleton />
                    ) : categories && categories.length > 0 ? (
                        categories.map((category) => (
                            <li key={category._id} className="w-full">
                                <button className={clsx(
                                    "w-full text-left px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground flex items-center gap-3",
                                    selectedCategory && selectedCategory._id === category._id && "bg-primary/90 text-primary-foreground"
                                )}
                                    onClick={() => updateSelectedCategory(category)}>
                                    <Image
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        width={24}
                                        height={24}
                                        priority
                                        className="rounded-full object-cover aspect-square"
                                    />
                                    {category.name}
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No categories found.</p>
                    )}
                </ul>
            </nav>
        </aside>
    );
}
