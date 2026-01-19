import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Spinner } from "@/Components/ui/spinner";
import { useState } from "react";

import { useDeleteTodoById, useGetAllTodoApi } from "../../hooks/todohooks";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/Components/ui/pagination";
import { TodoApi } from "@/services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateTodo from "./partials/create";
import EditTodo from "./partials/edit";
import Filters from "./partials/filters";

export default function About() {
  const [current, setCurrentPage] = useState<number>(1);

  const queryClient = useQueryClient();

  // mutation to update status
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      TodoApi.editTodoByID(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LEARN"] }); // refresh table
    },
  });

  //get all

  const { data, isLoading } = useGetAllTodoApi();
  //delete
  const { mutate: deleteTodo, isPending } = useDeleteTodoById();
  //usesate for editing
  const [editingId, setEditingId] = useState<string | null>(null);
  //navigation
  const navigate = useNavigate();

  // sorting
  const [filters, setFilters] = useState({ search: "" });
  //recent date filter
  const [latest, setLatest] = useState(true);


  //filtering
  const filteredValues = data?.data
    .filter((d) => d.name.toLowerCase().includes(filters.search.toLowerCase()))
    .sort((a, b) => {
      const timeA = new Date(a.created).getTime();
      const timeB = new Date(b.created).getTime();

      return latest
        ? timeB - timeA // Latest  Oldest
        : timeA - timeB; // Oldest Latest
    });
  const itemsPerPage = 5;

  const lastIndex = current * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // pageinitiation

  const currentItems = filteredValues?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil((filteredValues?.length || 0) / itemsPerPage);
  const pagesArray = Array(totalPages).fill(null);
  const handlePageChange = (pageNumber: number) => {
    if(pageNumber<1||pageNumber>totalPages) return
    setCurrentPage(pageNumber);
  };

  return (
    <div className=" flex h-[100] w-screen flex-col items-center justify-center min-h-screen bg-gray-100 p-3 sm:p-6">
      {isLoading && (
        <div className="flex justify-center   my-10">
          <Spinner className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="mt-6  overflow-x-auto rounded-xl w-screen  shadow-md bg-white">
        <CreateTodo />
        <Filters
          filters={filters}
          onChange={(f) => setFilters({ search: f.search || "" })}
        />
        <table className="mt-4 min-w-700PX w-full">
          <thead className="bg-linear-to-r from-blue-500  shadow-lg text-sm sm:text-base ">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">TITLE</th>
              <th className="py-3 px-4 text-left">
                <button
                  className="hover: text-sm sm:text-base"
                  onClick={() => setLatest(!latest)}
                >
                  Created
                  {latest?<ChevronUp /> : <ChevronDown />}
                </button>
              </th>
              <th className="py-3 px-4 text-left">Due-date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems?.map((item, i) => (
              <tr
                key={item.id}
                className="hover:bg-green-100 transition text-sm sm:text-base"
              >
                <td className="py-3 px-4 font-bold border-b">
                  {firstIndex + i + 1}
                </td>

                <td className="py-3 px-4 font-semibold border-b">
                  {item.name}
                </td>

                <td className="py-3 px-4 border-b">{item.created}</td>
                <td className="py-3 px-4 border-b">{item.dueDate}</td>

                {/* satus */}
                <td className="py-3 px-4 border-b font-semibold">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      disabled={item.status === "success"}
                    >
                      <Button
                        disabled={item.status === "success"}
                        variant={"ghost"}
                        className={`${
                          item.status === "success"
                            ? "bg-green-300 text-black"
                            : item.status === "in progress"
                              ? "bg-blue-200 text-black"
                              : "bg-yellow-200 text-black"
                        }`}
                      >
                        {item.status}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      {/* Pending */}
                      {item.status !== "pending" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus({ id: item.id, status: "pending" })
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                      )}

                      {/* In Progress */}
                      {item.status !== "in progress" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus({ id: item.id, status: "in progress" })
                          }
                        >
                          In Progress
                        </DropdownMenuItem>
                      )}

                      {/* Success */}
                      {item.status !== "success" && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus({ id: item.id, status: "success" })
                          }
                        >
                          Success
                        </DropdownMenuItem>
                      )}

                      {/* Optional: disable current status */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="py-3 px-4 border-b">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-xl sm:text-2xl hover:bg-gray-100 rounded"
                      >
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          const sureEdit = window.confirm(
                            `Are You Sure to edit"${item.name}" And ${item.dueDate}`,
                          );
                          if (sureEdit) {
                            setEditingId(item.id);
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        ✏️ Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate(`/view/${item.id}`)}
                      >
                        👁️ View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        disabled={isPending}
                        
                        onClick={() => {
                          const shouldDelete = window.confirm(
                            `Are you Sure You want to delte "${item.name}"`,
                          );
                          if (shouldDelete) {
                            deleteTodo(item.id);
                          }
                        }}
                        className="flex items-center gap-2w-full text-red-600 hover:bg-red-50"
                      >
                        {isPending && (
                          <Spinner className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        {isPending ? "Deleting..." : "🗑️Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit modal/sheet */}
      {editingId && (
        <EditTodo id={editingId} onClose={() => setEditingId(null)} />
      )}
      <Pagination className="flex  sm:gap-4  mt-4">
        <PaginationContent>
          <PaginationItem >
            <PaginationPrevious
              onClick={() => {
                handlePageChange(current - 1);
                {
                  current ==+1;
                }
              }}
            />
          </PaginationItem>
          {pagesArray.map((_, i) => (
            <PaginationItem>
              <PaginationLink className="bg-blue-100"
                isActive={i + 1 == current}
                onClick={() => {
                  handlePageChange(i + 1);
                  Math.floor(current - 1) * totalPages;
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                handlePageChange(current + 1);
                {
                  current == +1;
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
