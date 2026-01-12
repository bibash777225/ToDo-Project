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
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Spinner } from "@/Components/ui/spinner";

import { useDeleteTodoById, useGetAllTodoApi } from "../../hooks/todohooks";

import EditTodo from "./partials/edit";
import { useNavigate } from "react-router-dom";
import CreateTodo from "./partials/create";



export default function About() {
//get all 
  const { data, isLoading } = useGetAllTodoApi();

  const { mutate: deleteTodo, isPending } = useDeleteTodoById();
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      {isLoading && (
        <div className="flex justify-center items-center my-10">
          <Spinner className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <CreateTodo />

      <div className="mt-6 overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-700PX w-full">
          <thead className="bg-amber-200 text-sm sm:text-base">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Created</th>
              <th className="py-3 px-4 text-left">Duedate</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-green-100 transition text-sm sm:text-base"
              >
                <td className="py-3 px-4 font-bold border-b">{item.id}</td>

                <td className="py-3 px-4 font-semibold border-b">
                  {item.name}
                </td>

                <td className="py-3 px-4 border-b">{item.created}</td>
                <td className="py-3 px-4 border-b">{item.dueDate}</td>

                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    item.status === "success"
                      ? "text-green-600"
                      : item.status === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  <Button className="bg-amber-100 text-xl text-black hover:bg-amber-800"> {item.status} </Button> 
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
