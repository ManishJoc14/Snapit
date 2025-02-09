"use client"

import Pagination from "../pagination"
import { useState, useEffect } from "react"
import { useFetch } from "@/hooks/useFetch"
import ProductCard from "@/components/home/product-card"
import SortSelect from "../filtering_sorting/sort-select"
import { AdvancedFiltersDialog } from "../filtering_sorting/filter_dialog"
import ProductCardSkeleton from "@/components/skeletons/product-card-skeleton"
import { type Sort, type Product, Sorts, type FilterValues, type FilterGroup, type Category, type PaginationState } from "@/types/definitions"

 /* ------------------- Filter groups for advanced filters ------------------- */
const filterGroups: FilterGroup[] = [
    {
        name: "Text Filters",
        filters: {
            name: { type: "text", label: "Name" },
            storeId: { type: "text", label: "Store ID" },
            categoryId: { type: "text", label: "Category ID" },
            size: { type: "text", label: "Size" },
            color: { type: "text", label: "Color" },
            units: { type: "text", label: "Units" },
        },
    },
    {
        name: "Number Filters",
        filters: {
            minPrice: { type: "number", label: "Min Price" },
            maxPrice: { type: "number", label: "Max Price" },
            minStock: { type: "number", label: "Min Stock" },
            maxStock: { type: "number", label: "Max Stock" },
        },
    },
    {
        name: "Boolean Filters",
        filters: {
            featured: { type: "boolean", label: "Featured" },
            archived: { type: "boolean", label: "Archived" },
        },
    },
    {
        name: "Date Filters",
        filters: {
            minCreatedAt: { type: "date", label: "Min Created At" },
            maxCreatedAt: { type: "date", label: "Max Created At" },
        },
    },
]

export default function ProductsPage({ selectedCategory }: { selectedCategory: Category | null }) {
    // used to generate query params for API request
    const [queryParams, setQueryParams] = useState("")

    // Sorting state
    const [orderBy, setOrderBy] = useState<Sorts>(Sorts["Created At"]);
    const [orderDirection, setOrderDirection] = useState<Sort>("desc");

    // Filtering state
    const [filterValues, setFilterValues] = useState<{ [key: string]: FilterValues }>({});

    // Pagination state
    const initialPaginationSate: PaginationState = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
    }
    const [pagination, setPagination] = useState<PaginationState>(initialPaginationSate);

    // Fetch products
    const { loading, data, error } = useFetch<{ data: { data: Product[], pagination: PaginationState } }>(`/api/filter-products?${queryParams}`);
    const products = data?.data?.data ?? null;
    useEffect(() => {
        if (data?.data?.pagination) {
            // Update pagination when data is received
            setPagination(data.data.pagination);
        }
    }, [data]);

    // On mount Get saved filters from local storage
    useEffect(() => {
        const savedFilters = localStorage.getItem("advancedFilters")
        if (savedFilters) {
            setFilterValues(JSON.parse(savedFilters))
        }
    }, [])

    // Generate query params for API request
    useEffect(() => {
        if (!pagination?.currentPage || !pagination?.itemsPerPage) return;
        localStorage.setItem("advancedFilters", JSON.stringify(filterValues));
        setQueryParams(new URLSearchParams({
            sortBy: orderBy.toString(),
            order: orderDirection,
            page: pagination.currentPage.toString(),
            limit: pagination.itemsPerPage.toString(),
            ...filterValues,
        }).toString());
    }, [orderBy, orderDirection, filterValues, pagination?.currentPage, pagination?.itemsPerPage])

    // Filter products by selected category
    useEffect(() => {
        if (selectedCategory) {
            setFilterValues((prev) => ({ ...prev, categoryId: selectedCategory._id }))
        } else {
            setFilterValues((prev) => {
                // remove categoryId from filters if it doesn't exist
                const { categoryId, ...rest } = prev // eslint-disable-line @typescript-eslint/no-unused-vars 
                return rest;
            })
        }
    }, [selectedCategory])

    const clearFilters = () => {
        setFilterValues({})
        localStorage.removeItem("advancedFilters")
    }

    const handlePageChange = (newPage: number) => {
        setPagination((prev) => prev ? { ...prev, currentPage: newPage } : prev)
    }

    return (
        <main className="flex-1">
            { /* ------------------------------ Error message ----------------------------- */}
            {
                error && <div className="text-center text-red-500">{error.message}</div>
            }
            <div className="flex  flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <h1 className="text-xl font-semibold">Buy {selectedCategory && <span>{selectedCategory.name}</span>} Products Online</h1>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {/* -------------------------- Filter ------------------------- */}
                    <AdvancedFiltersDialog
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        clearFilters={clearFilters}
                        filterGroups={filterGroups}
                    />
                    {/* -------------------------- Sort ------------------------- */}
                    <SortSelect
                        orderBy={orderBy}
                        orderDirection={orderDirection}
                        onChange={(orderBy, orderDirection) => {
                            setOrderBy(orderBy as Sorts)
                            setOrderDirection(orderDirection)
                        }}
                        options={Sorts}
                    />
                </div>
            </div>

            {/* ------------------------ Show loading or products ------------------------ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
                ) : Array.isArray(products) && products.length > 0 ? (
                    products.map((product: Product) => <ProductCard key={product._id} {...product} />)
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            {/* ------------------------ Pagination ------------------------ */}
            {!loading && products && products.length > 0 && pagination && (
                <Pagination pagination={pagination} handlePageChange={handlePageChange} />
            )}
        </main>
    )
}

