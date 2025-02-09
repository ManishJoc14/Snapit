"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { FilterGroup, FilterValues } from "@/types/definitions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface AdvancedFiltersDialogProps {
    filterValues: { [key: string]: FilterValues }
    filterGroups: FilterGroup[]
    setFilterValues: React.Dispatch<React.SetStateAction<{ [key: string]: FilterValues }>>
    clearFilters: () => void
}

export function AdvancedFiltersDialog({
    filterValues,
    filterGroups,
    setFilterValues,
    clearFilters,
}: AdvancedFiltersDialogProps) {
    const [open, setOpen] = useState(false)
    // state to keep track of expanded groups
    const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({})
    // example {"Text Filters(group name)": true(expanded state),...}

    // Toggle the expanded state of a filter group 
    const toggleGroup = (groupName: string) => {
        setExpandedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }))
    }

    // to handle the input change in the filter
    // key is like "name", "storeId", "minPrice", etc.(filter key)
    // value is the value of the corresponding filter key
    const handleInputChange = (key: string, value: FilterValues) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }))
    }

    // to get the count of active filters in a specific group
    const getActiveFiltersCount = (group: FilterGroup) => {
        return Object.keys(group.filters).filter((key) => {
            const value = filterValues[key]
            return value !== "" && value !== false && value !== undefined
        }).length
    }

    // to get the count of total active filters in all groups
    const totalActiveFiltersCount = Object.values(filterValues).filter(
        (value) => value !== "" && value !== false && value !== undefined,
    ).length

    // to close the dialog
    const handleClose = () => {
        setOpen(false)
    }
    const handleClear = () => {
        clearFilters()
        setOpen(false)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    Filters
                    {/* ----------------- show the count of total active filters ----------------- */}
                    {totalActiveFiltersCount > 0 && (
                        <span className="ml-1 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">
                            {totalActiveFiltersCount}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] h-[95vh]">
                <DialogHeader className="mb-1">
                    <DialogTitle className="text-xl font-bold">Advanced Filters</DialogTitle>
                </DialogHeader>
                <ScrollArea className="pr-6">
                    {filterGroups.map((group, index) => (
                        <div key={group.name}>
                            <Button
                                variant="ghost"
                                className="w-full justify-between py-2 text-md hover:bg-transparent"
                                /* ---------------------- toggle the state of the group --------------------- */
                                onClick={() => toggleGroup(group.name)}
                            >
                                <span className="font-semibold">{group.name}</span>
                                <div className="flex items-center gap-2">
                                    { /* -------------- Show the count of active filters in the group ------------- */}
                                    {getActiveFiltersCount(group) > 0 && (
                                        <span className="rounded-full bg-emerald-500 px-4 py-1 text-md font-medium text-white">
                                            {getActiveFiltersCount(group)}
                                        </span>
                                    )}
                                    {expandedGroups[group.name] ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                                </div>
                            </Button>

                            {/* ------------ if group is expanded show the available filters of that group ------------ */}
                            {expandedGroups[group.name] && (
                                <div className="mt-2 px-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
                                        {Object.entries(group.filters).map(([key, filter]) => (
                                            <div key={key} className="flex flex-col space-y-4">
                                                <Label htmlFor={key} className="text-sm">
                                                    {filter.label}
                                                </Label>

                                                {/* ----------------- Show the filter input based on the type ----------------- */}
                                                {filter.type === "boolean" ? (
                                                    <Switch
                                                        id={key}
                                                        checked={(filterValues[key] as boolean) || false}
                                                        onCheckedChange={(checked) => handleInputChange(key, checked)}
                                                        className="scale-125"
                                                    />
                                                ) : (
                                                    <Input
                                                        /* ----------------- Show the filter input based on the type ---------------- */
                                                        id={key}
                                                        type={filter.type}
                                                        value={(filterValues[key] as string) || ""}
                                                        onChange={(e) => handleInputChange(key, e.target.value as FilterValues)}
                                                        className="h-10 text-sm"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {index < filterGroups.length - 1 && <Separator className="my-6" />}
                        </div>
                    ))}
                </ScrollArea>
                <Separator className="mt-0 mb-6" />

                {/* ---------------------- Clear all filters button --------------------- */}
                <div className="flex justify-center gap-4">
                    <Button onClick={handleClear} className="w-full h-10 text-md font-semibold  bg-destructive/95 hover:bg-destructive">
                        Clear All Filters
                    </Button>
                    <Button onClick={handleClose} className="w-full h-10 text-md font-semibold bg-green-500 hover:bg-green-600">
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

