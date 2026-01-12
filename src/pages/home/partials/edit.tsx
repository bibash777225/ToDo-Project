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


export default function EditTodo({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const { data: todo, isLoading } = useTodoGetById(id);
  const { mutate, isPending } = useEditTodoById();

  const [title, setTitle] = useState("");
   const[activities,setActivities]=useState("")
   const[sstatus,setSstatus]=useState("")

  useEffect(() => {
    if (todo?.data?.name ||todo?.data?.Activities||todo?.data?.status) {
      setTitle(todo.data.name);
      setActivities(todo.data.Activities)
      setSstatus(todo.data.status)
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
          Activities:activities.trim(),
          status:sstatus.trim(),
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
    <Sheet open onOpenChange={onClose}>
      <SheetContent side="left" className="w-[]">
        <SheetHeader>
          <SheetTitle className="text-black-500 font-extrabold">Edit Todo</SheetTitle>
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
              <label className="text-shadow-black font-semibold" > Activities</label>
              <Input
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="Enter todo Activities"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isPending) {
                    handleUpdate();
                  }
                }}
              />
              <label className="text-shadow-black font-semibold" >Update Status</label>
              <Input
                value={sstatus}
                onChange={(e) => setSstatus(e.target.value)}
                placeholder="Enter Status of Work"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isPending) {
                    handleUpdate();
                  }
                }}
              />
            </div>

            <SheetFooter className="mt-6 flex gap-2">
              <Button variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isPending || !title.trim()||!activities.trim()}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
