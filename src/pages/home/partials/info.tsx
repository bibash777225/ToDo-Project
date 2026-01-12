import { Button } from "@/Components/ui/button";
import { useGetAllTodoApi } from "@/hooks/todohooks";
import { useNavigate } from "react-router-dom";


// const {id}=useParams<{id:string}>()

function Info() {
  const { data } = useGetAllTodoApi();
   const navigate=useNavigate()
  return (
    <div className="max-h-screen bg-green-50 p-76">
      <div className="max-w-xl mx-auto bg-red p-6 rounded-xl shadow">
        <ul role="list">
          {data?.data.map((item) => (
            <li key={item.id} className="flex py-4 first:pt-0 last:pb-0">
              <img
                className="h-30 absolute-top-36 left-1/2 -translate-x-1/2 w-32 rounded-lg shadow-xlopacity-0 group-hover:opacity-100transition"
                src={item.image}
                alt={item.name}
              />
              <div className="ml-3 flex-10 overflow-hidden">
                <p className="text-2xl font-medium mask-b-from-accent-foreground text-gray-900 dark:text-black">
                  {item.Activities}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {item.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="bg-red-500 text-2xl hover:bg-sky-700"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}

export default Info;
