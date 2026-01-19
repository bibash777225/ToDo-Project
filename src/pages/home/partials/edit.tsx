import { useEditTodoById, useTodoGetById } from "@/hooks/todohooks";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/Components/ui/sheet";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Spinner } from "@/Components/ui/spinner";
import { Dialog, DialogOverlay } from "@radix-ui/react-dialog";


export default function EditTodo({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { data: todo, isLoading } = useTodoGetById(id);

  const { mutate, isPending } = useEditTodoById();

 const today = new Date().toISOString().split("T")[0];

  const [dueDate, setDueDate] = useState("");

  const [title, setTitle] = useState("");
  //  const[activities,setActivities]=useState("")
  //  const[sstatus,setSstatus]=useState("")

  useEffect(() => {
    if (todo?.data?.name ||todo?.data?.dueDate) {
      setTitle(todo.data.name);
      setDueDate(todo.data.dueDate)
      // setSstatus(todo.data.status)
    }
  }, [todo]);

  const handleUpdate = () => {
    if (!title.trim()) return;

  //  const handleActivities=  ()=>{
  //    if(!activities.trim()) return;
  //  }
    mutate(
      { id, 
        data: 
        { name: title.trim(),
         dueDate:dueDate,
          // status:sstatus.trim(),
         },
         
      },
      {
        onSuccess: () => {
          onClose(); // Close only on success
        },
      }
    );
  };

  return (
    <Dialog>
      <Sheet open onOpenChange={onClose}>
        <DialogOverlay className="backdrop-blur-lg" />
        <SheetContent className="sm:max-w-md" side="left">
          <SheetHeader>
            <SheetTitle className="text-lg sm:text-xl">Edit Todo</SheetTitle>
          </SheetHeader>

          {isLoading ? (
            <div className="flex justify-center items-center mt-10">
              <Spinner className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="mt-6 space-y-6">
                <label className="text-xl font-medium">Todo Name</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter todo name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isPending) {
                      handleUpdate();
                    }
                  }}
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
              </div>

              <SheetFooter className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={isPending || !title.trim() || !setDueDate}
                >
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Dialog>
  );
}




