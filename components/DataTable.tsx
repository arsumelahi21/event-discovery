"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchKeys?: (keyof T)[];
  onPrint?: (row: T) => void; // 👈 Added print callback
};

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  title = "Data Table",
  searchKeys = [],
  onPrint,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (search) {
      filtered = filtered.filter((row) =>
        searchKeys.some((key) =>
          String(row[key]).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortOrder === "asc"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        return 0;
      });
    }

    return filtered;
  }, [data, search, searchKeys, sortBy, sortOrder]);

  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`py-3 px-4 text-left font-semibold ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                >
                  {col.label}{" "}
                  {sortBy === col.key && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              ))}
              {onPrint && (
                <th className="py-3 px-4 text-center font-semibold">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    onPrint ? columns.length + 1 : columns.length
                  }
                  className="text-center py-6 text-gray-500 italic"
                >
                  No records found
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition text-sm"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="py-3 px-4">
                      {col.render ? col.render(row) : String(row[col.key])}
                    </td>
                  ))}

                  {onPrint && (
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onPrint(row)}
                        className="text-primary hover:underline"
                      >
                        Print
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
