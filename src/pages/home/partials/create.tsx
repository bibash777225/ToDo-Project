import { useState } from "react";
import { useCreateTodo } from "../../../hooks/todohooks";
import { Spinner } from "@/Components/ui/spinner";
import { HoverCard } from "@radix-ui/react-hover-card";


export default function CreateTodo() {
  const [todoName, setTodoName] = useState("");
  const { mutate, isPending } = useCreateTodo();
  // const {deleteModal}=useDeleteTodoById()

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (todoName.trim()) {
      mutate({
        name: todoName,
      });
      setTodoName("");
    }
  };
  return (
    <>
      <div className="text-center font-bold text-2xl border-b-4 border-gray-500 pb-2 bg-amber-100">
        <h1> Todo List</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form
            onSubmit={handleCreateTodo}
            className="flex gap-3flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              placeholder="Enter todo name..."
              className="w-full sm:flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg"
            />
            {isPending && (
              <Spinner className="w-8 h-8 border-4 self-center ... text-green-500 border-t-transparent rounded-full animate-spin"></Spinner>
            )}
            <HoverCard> </HoverCard>
            <button
              type="submit"
              className="w-full sm:w-auto  bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-99 font-medium"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
