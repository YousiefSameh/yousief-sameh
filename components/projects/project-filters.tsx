"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface ProjectFiltersProps {
  categories: string[]
  statuses: string[]
  years: number[]
  currentCategory?: string
  currentStatus?: string
  currentYear?: string
}

export function ProjectFilters({
  categories,
  statuses,
  years,
  currentCategory,
  currentStatus,
  currentYear,
}: ProjectFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/projects?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/projects")
  }

  const hasFilters = currentCategory || currentStatus || currentYear

  return (
    <div className="mt-12 flex flex-wrap items-center gap-4">
      <Select
        value={currentCategory || "all-categories"}
        onValueChange={(value) => updateFilter("category", value || null)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-categories">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category.replace("-", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentStatus || "all-statuses"} onValueChange={(value) => updateFilter("status", value || null)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-statuses">All Statuses</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status} className="capitalize">
              {status.replace("-", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentYear || "all-years"} onValueChange={(value) => updateFilter("year", value || null)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-years">All Years</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
