import { useParams } from "react-router-dom";
import { useTodoGetById } from "@/hooks/todohooks";
import { Spinner } from "@/Components/ui/spinner";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ViewTodo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useTodoGetById(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data?.data) {
    return <p className="text-center mt-10">Todo not found</p>;
  }

  return (
    <div className="min-h-screen bg--100 p-6">
      <div className="max-w-xl mx-auto bg-red p-6 rounded-xl shadow"> 
        <h1 className="text-2xl font-bold mb-4 text-green-700">Todo Details</h1>

        <p className="mb-2">
          <strong>ID:</strong> {data.data.id}
        </p>

        <p className="mb-2">
          <strong>Name:</strong> {data.data.name}
        </p>

        <p className="mb-2">
          <strong>Status:</strong> {data.data.status}
        </p>

        <p className="mb-6">
          <strong>Activities:</strong> {data.data.Activities}
        </p>

        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </div>
  );
}
