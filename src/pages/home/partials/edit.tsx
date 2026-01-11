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

  useEffect(() => {
    if (todo?.data?.name) {
      setTitle(todo.data.name);
    }
  }, [todo]);

  const handleUpdate = () => {
    if (!title.trim()) return;

    mutate(
      { id, data: { name: title.trim() } },
      {
        onSuccess: () => {
          onClose(); // Close only on success
        },
      }
    );
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400]">
        <SheetHeader>
          <SheetTitle>Edit Todo</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spinner className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium">Todo Name</label>
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
            </div>

            <SheetFooter className="mt-6 flex gap-2">
              <Button variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isPending || !title.trim()}
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
