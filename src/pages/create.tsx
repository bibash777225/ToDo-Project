import { useState } from "react";
import { useCreateTodo } from "../services/todo";
import { Spinner } from "@/Components/ui/spinner";


export default function CreateTodo() {
  const [todoName, setTodoName] = useState("");
  const { mutate,isPending} = useCreateTodo();


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
      <div className="text-center font-bold text-3xl border-b-4 border-gray-500 pb-2 bg-amber-300">

      <h1 > Todo List</h1>
      
    <div className="bg-white rounded-xl shadow-sm p-6">
      
      <form onSubmit={handleCreateTodo} className="flex gap-3">
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="Enter todo name..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
        {isPending &&(

      <Spinner className="w-10 h-10 border-4 text-green-500 border-t-transparent rounded-full animate-spin"></Spinner>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium"
        >
          
          Create
        </button>
      </form>
    </div>
    </div>
    </>
  );
}