import type ApiData from "../types/todo";
import { TodoApi } from "@/services/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//custom hooks for getAll todo
export const useGetAllTodoApi = () => {
  return useQuery({
    queryKey: ["LEARN"],
    queryFn: TodoApi.getAllTodo,
  });
};

//coustume hooks for getTodoBYId
export const useTodoGetById = (id: string | number) => {
  return useQuery({
    queryKey: ["LEARN", id],
    queryFn: () => TodoApi.getTodoById(id),
  });
};

//custume hooks for deleteTodoByID
// export const useDeleteTodoById=(id:string|number)=>{

//     useQuery({
//         queryKey:["Learn",id],
//         queryFn:()=>TodoApi.deleteTodoById(id)
//     })
// }

//coustume hooks for updateTodoById
// export const updateTodoById=(id:string|number)=>{
//     useQuery({
//     queryKey:["Learn",id],
//     queryFn:TodoApi.updateTodoById(id)

//     })
// }

// coustume hooks for createTOdoById
//   export const createTodo=()=>{
//     useQuery({
//     queryKey:["Learn"],
//     queryFn:TodoApi.createTodo()

//     })
// }
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ApiData>) => TodoApi.createTodo(data),
    onSuccess: () => {
      // refresh toto list after create
      // invo
      queryClient.invalidateQueries({
        queryKey: ["LEARN"],
      });
    },
  });
};

export const useDeleteTodoById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TodoApi.deleteTodoById,
    onSuccess: (_, id) => {
      // refresh toto list after create
      // Invalidate and refetch the todo list after deletion
      queryClient.invalidateQueries({
        queryKey: ["LEARN"],
      });
      queryClient.invalidateQueries({
        queryKey: ["LEARN", id],
      });
    },
  });
};


//edit 
export const useEditTodoById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ApiData> }) =>
      TodoApi.editTodoByID(id, data),

    onSuccess: (_, variables) => {
      // refresh toto list after create
      // Invalidate and refetch the todo list after deletion
      queryClient.invalidateQueries({
        queryKey: ["LEARN"],
      });
      queryClient.invalidateQueries({
        queryKey: ["LEARN", variables.id],
      });
    },
  });
};

// custom hook for update todo status
// const queryClient = useQueryClient();

// // update status directly
//  export const { mutate: updateStatus } = useMutation({
//   mutationFn: ({ id, status }: { id: string; status: string }) =>
//     TodoApi.editTodoByID(id, { status }),

//   onSuccess: () => {
//     // refresh todo list
//     queryClient.invalidateQueries({ queryKey: ["LEARN"] });
//   },
// });
//  export const updateStatus=()=>{
//   const queryClient=useQueryClient();
//   return useMutation({
//   mutationFn:({ id, status }: { id: string; status: string })=>
//     TodoApi.editTodoByID(id,{status}),

//   onSuccess:()=>{

//     //refresh todo list 
//     queryClient.invalidateQueries({queryKey:["LEARN"]})
//   }

//   });
// }