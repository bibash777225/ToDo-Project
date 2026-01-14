//  import { Spinner } from "@/Components/ui/spinner";
// import {
//   useTodoGetById,
//   useGetAllTodoApi,

// } from "../services/todo";

// export default function About() {

//   // get by id ko
//   const { data: id } = useTodoGetById(5);
//   console.log(id);

//   // delete ko

//   //  const {data:dl}=useDeleteTodoById(5)
//   //  console.log(dl)
//   // get all ko

//   const { data ,isLoading} = useGetAllTodoApi();
//   console.log(data);

//   // create

// //   const { mutate } = useCreateTodo();
// //   const handleCreateTodo = () => {
// //     mutate({
// //       name: "hi bibash",
// //     });
// //   };

// return (

//   // full screen height        lightbackgaround  padding
//   <div className="h-screen bg-gray-100 p-6 flex flex-wrap gap-6 justify">

//     <div className="flex-text-center justify-center h-screen">
// { isLoading &&(

//       <Spinner className="w-10 h-10 border-4 text-green-500  bg-center border-t-transparent rounded-full animate-spin"></Spinner>

// )}
//     </div>

//       {data?.data.map((item) => (
//         <div
//           key={item.id}
//           className=" w-64 bg-white border-gray-300 p-5 gap-6 rounded-xl shadow-sm hover:shadow-lg transition"
//         >
//           <div className="text-lg font-semibold text-green-700 text-center">
//             {item.name}
//           </div>
//         </div>
//       ))}
// {/*
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={handleCreateTodo}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           create
//         </button>
//       </div> */}

//       <div className="flex flex-wrap gap-6 justify-center">

//       <h2 >
//         {id?.data.name}
//       </h2>
//       </div>
//     </div>
//   );
// }
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

import { TodoApi } from "@/services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateTodo from "./partials/create";
import EditTodo from "./partials/edit";
import Filters from "./partials/filters";

export default function About() {
  // for status update
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
  const [latest, setLatest] = useState(true);
  //accending
  // const [sort, setSort] = useState({ ascending: false });

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

  return (
    <div className=" flec h-[100] w-[100vw] flex-col items-center justify-centermin-h-screen bg-gray-100 p-3 sm:p-6">
      {isLoading && (
        <div className="flex justify-center   my-10">
          <Spinner className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl shadow-md bg-white">
        <CreateTodo />
        <Filters
          filters={filters}
          onChange={(f) => setFilters({ search: f.search || "" })}
        />
        <table className="min-w-700PX w-full">
          <thead className="bg-linear-to-r from-blue-500  shadow-lg text-sm sm:text-base ">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">TITLE</th>
              <th className="py-3 px-4 text-left">
                Created
                <button onClick={() => setLatest(!latest)}>
                  {latest ? <ChevronUp /> : <ChevronDown />}
                </button>
              </th>
              <th className="py-3 px-4 text-left">Duedate</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredValues?.map((item, i) => (
              <tr
                key={item.id}
                className="hover:bg-green-100 transition text-sm sm:text-base"
              >
                <td className="py-3 px-4 font-bold border-b">{i + 1}</td>

                <td className="py-3 px-4 font-semibold border-b">
                  {item.name}
                </td>

                <td className="py-3 px-4 border-b">{item.created}</td>
                <td className="py-3 px-4 border-b">{item.dueDate}</td>

                {/* satus */}
                <td className="py-3 px-4 border-b font-semibold">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
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
                      {item.status === "success" && (
                        <DropdownMenuItem disabled>
                          Already Success
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="py-3 px-4 border-b">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-xl sm:text-2xl">
                        ⋮
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingId(item.id)}>
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => navigate(`/view/${item.id}`)}
                      >
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => deleteTodo(item.id)}
                        className="flex items-center gap-2"
                      >
                        {isPending && (
                          <Spinner className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        {isPending ? "Deleting..." : "Delete"}
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
    </div>
  );
}
