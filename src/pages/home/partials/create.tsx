import { useState } from "react";
import { useCreateTodo } from "../../../hooks/todohooks";
import { Spinner } from "@/Components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

export default function CreateTodoPopup() {
  const today = new Date().toISOString().split("T")[0];

  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateTodo();
//form submit handler function run when user submit the form  also prevent default form submision behavior (page reload)
  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todoName.trim() || !dueDate) {
      console.error("Todo name and due date are required");
      return;
    }

    mutate(
      {
        name: todoName.trim(),
        created: today, // today date
        dueDate,
        status: "pending",
      },
      {
        onSuccess: () => {
          console.log("Todo created successfully");
          setTodoName("");
          setDueDate("");
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating todo:", error);
        },
      }
    );
  };

  return (
    
    <div className="text-center font-bold text-2xl border-b-4 bg-linear-to-r from-blue-500  shadow-lg">
  
      <h1 className="text-xl sm:text-2xl py-3">Todo List</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="backdrop-blur-lg" />
        <DialogTrigger asChild>
          {/* aschild passes props to child instead of wrapping in extraelemnt  */}
          <Button className="  bg-white text-amber-600 hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
            Add Todo
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Create New Todo
            </DialogTitle>

            <DialogDescription className="text-sm sm:text-base">
              Fill out the form below to add a new todo item.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleCreateTodo}
            className="flex flex-col gap-4 sm:gap-4 mt-4"
          >
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              placeholder="Enter todo name..."
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-amber-400
               focus:border-amber-400 transition"
            />
            <label className="text-sm font-semibold text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              min={today} // prevent selecting dates in past
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-400
               focus:border-blue-400 transition"
            />
            {/* Conditional rendering */}
            {isPending && (
              <Spinner className="w-8 h-8 border-4 self-center text-green-500 border-t-transparent rounded-full animate-spin" />
            )}
            <DialogFooter className="mt-2 flex justify-end gap-2">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="rounded-lg px-6"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
