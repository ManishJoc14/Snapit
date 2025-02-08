'use client';

import Image from "next/image";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, Star } from 'lucide-react';
import type { Product } from "@/types/definitions";

export default function ProductCard(product: Product) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const isOutOfStock = product.stockQuantity === 0;
    return (
        <div className="group relative border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 w-full">
            {/* ----------------------- Featured & Left Badges ---------------------- */}
            {product.featured && (
                <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Featured
                </Badge>
            )}

            {/* -------------------------- if quantity is less than 10 & Right Badge -------------------------- */}
            {!isOutOfStock && product.stockQuantity < 10 && (
                <Badge className="absolute top-2 right-2 z-10 bg-secondary text-secondary-foreground">
                    Only {product.stockQuantity} left
                </Badge>
            )}

            {/* -------------------------- image of the product -------------------------- */}
            <div className="relative aspect-square bg-muted/10">
                {!imageLoaded && <div className="absolute inset-0 bg-muted/20 animate-pulse" />}
                <Image
                    src={product.imageURL || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    onLoad={() => setImageLoaded(true)}
                />

                { /* ------------------- if out of stock, show overlay on it ------------------ */}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4" />
                            Out of Stock
                        </div>
                    </div>
                )}
            </div>

            <Separator />

            {/* -------------------------- product details here -------------------------- */}
            <div className="p-4 space-y-3">
                {/* ---------------------------- time and category --------------------------- */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        8 mins
                    </div>
                    <Badge variant="secondary" className="font-normal">
                        {product.category.name}
                    </Badge>
                </div>

                {/* ---------------------------- product name and units --------------------------- */}
                <div className="flex justify-between">
                    <h3 className="font-medium leading-tight">{product.name}</h3>
                    <span className="text-muted-foreground">{product.units}</span>
                </div>

                {/* ---------------------------- price and add button --------------------------- */}
                <div className="flex items-center justify-between pt-1">
                    <div className="space-y-0.5">
                        <div className="font-semibold">Rs.{product.price}</div>
                    </div>
                    <Button
                        size="sm"
                        disabled={isOutOfStock}
                        className="transition-transform active:scale-95"
                    >
                        {isOutOfStock ? "Sold Out" : "ADD"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
