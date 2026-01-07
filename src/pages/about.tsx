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
import { useGetAllTodoApi, useTodoGetById } from "../services/todo";
import { TodoApi } from "../services/todo";
// interface TodoItemProps {
//   todo: <ApiData>;
// }

export default function About() {
  const { data: id } = useTodoGetById(5);
  const { data, isLoading } = useGetAllTodoApi();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* u chai spinner haleko  */}
      {isLoading && (
        <div className="flex justify-center items-center my-10">
          <Spinner className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Todo Table ko lagi u chai */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md">
          <thead className="bg-amber-200">
            <tr>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                ID
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Name
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                {" "}
                Activities
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Status
              </th>
              <th className="py-3 px-6 text-left border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => (
              <tr key={item.id} className="hover:bg-green-100 transition">
                <td className="py-3 px-6 border-b border-gray-300">
                  {item.id}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {item.name}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  {item.Activities}
                </td>

                <td
                  className={`py-3 px-6 border-b border-gray-300 ${
                    item.status === "success"
                      ? "text-green-600 font-semibold"
                      : item.status === "pending"
                      ? "text-yellow-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-3 px-6 border-b border-gray-300">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">...</Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => TodoApi.deleteTodoById(item.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Single Todo By ID  */}
      {id?.data && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">
            Selected Todo: {id.data.name}
          </h2>
        </div>
      )}
    </div>
  );
}
