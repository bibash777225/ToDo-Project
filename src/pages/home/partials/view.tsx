import { Link, useParams, useNavigate } from "react-router-dom";
import { useTodoGetById } from "@/hooks/todohooks";
import { Spinner } from "@/Components/ui/spinner";
import { Button } from "@/Components/ui/button";

export default function ViewTodo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useTodoGetById(id!);

  // Loading state 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  //Not found 
  if (!data?.data) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">Todo not found</p>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 px-4 py-6 sm:py-10">
      <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-green-700 text-center">
          Todo Details
        </h1>

        <div className="space-y-2 text-base sm:text-xl">
          <p>
            <strong>ID:</strong> {data.data.id}
          </p>
          <p>
            <strong>Name:</strong> {data.data.name}
          </p>
          <p>
            <strong>Status:</strong> {data.data.status}
          </p>
          <p>
            <strong>Activities:</strong> {data.data.Activities ?? "-"}
          </p>
        </div>

       {/* BUTTON */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
          <Button
            className="w-full sm:w-auto bg-red-500 hover:bg-sky-700 text-lg sm:text-xl"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Link to="/info" className="w-full sm:w-auto">
            <Button className="w-full bg-green-500 hover:bg-sky-700 text-lg sm:text-xl">
              Info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
