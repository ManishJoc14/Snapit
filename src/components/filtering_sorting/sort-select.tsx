"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChartNoAxesColumnDecreasing, ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sorts } from "@/types/definitions";

interface SortSelectProps {
    orderBy: string;
    orderDirection: "asc" | "desc";
    onChange: (orderBy: string, orderDirection: "asc" | "desc") => void;
    options: typeof Sorts;
    placeholder?: string;
    className?: string;
}

export default function SortSelect({ orderBy, orderDirection, onChange, options, placeholder = "Sort by", className }: SortSelectProps) {
    const OrderingIcon = orderDirection === "asc" ? ChartNoAxesColumnIncreasing : ChartNoAxesColumnDecreasing;
    return (
        <div className="flex items-center gap-2">
            <Select value={orderBy} onValueChange={(value) => onChange(value, orderDirection)}>
                <SelectTrigger className={`flex-1 min-w-[100] ${className}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                {/* ------------------------------ Sorting Options ---------------------------- */}
                <SelectContent className="space-y-2">
                    {Object.keys(options).map((key: string) => (
                        <SelectItem key={key} value={Sorts[key as keyof typeof Sorts]}>
                            {key}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* --------------------------- Order Toggle Button(ascending or descending) -------------------------- */}
            <Button
                size="icon"
                variant="outline"
                onClick={() => onChange(orderBy, orderDirection === "asc" ? "desc" : "asc")}
                className="w-10 h-10"
            >
                <OrderingIcon className='w-5 h-5' />
            </Button>
        </div>
    );
}
