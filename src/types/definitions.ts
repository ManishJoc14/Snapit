export type Category = {
    _id: string;
    name: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Product = {
    _id: string;
    storeId: string;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    stockQuantity: number;
    units: string;
    featured: boolean;
    archived: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
};


export type Sort = "asc" | "desc";

export enum Sorts {
    Name = "name",
    Price = "price",
    "Stock Quantity" = "stockQuantity",
    "Created At" = "createdAt",
    "Updated At" = "updatedAt"
}

export enum Filters {
    Name = "name",
    "Store Id" = "storeId",
    "Category Id" = "categoryId",
    "Min Price" = "minPrice",
    "Max Price" = "maxPrice",
    size = "size",
    color = "color",
    featured = "featured",
    archived = "archived",
    units = "units",
    "Min Creation" = "minCreatedAt",
    "Max Creation" = "maxCreatedAt",
}

export type FilterValues = string | number | boolean | Date;


export interface FilterGroup {
    name: string
    filters: {
        [key: string]: {
            type: "text" | "number" | "boolean" | "date"
            label: string
        }
    }
};
// Example of a filter group:
//     {
//      name: "Basic Filters",
//         filters: {
//         name: { type: "text", label: "Name" },
//         storeId: { type: "text", label: "Store ID" },
//         categoryId: { type: "text", label: "Category ID" },
//         minPrice: { type: "number", label: "Minimum Price" },
//         maxPrice: { type: "number", label: "Maximum Price" },
//      }
//   }

export type PaginationState = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}