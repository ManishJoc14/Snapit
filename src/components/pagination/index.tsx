import type { PaginationState } from "@/types/definitions";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    pagination: PaginationState,
    handlePageChange: (page: number) => void
};

export default function Pagination({ pagination, handlePageChange }: PaginationProps) {
    return (
        <>
            <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                    disabled={!pagination.hasPrevPage}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: pagination.totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            variant={pagination.currentPage === i + 1 ? "default" : "outline"}
                            size="icon"
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                    disabled={!pagination.hasNextPage}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </>
    )
}