import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type ApiData from "../types/todo";
import { endpoints } from "../constants/endpoint";
import axios from "axios";


export const TodoApi = {
  //get all
  getAllTodo: () => {
    return axios.get<ApiData[]>(endpoints.getAll);
  },

  //get by id
  getTodoById: (id: string | number) =>
    axios.get<ApiData>(endpoints.getById(id)),

  //  create

  createTodo: (data: Partial<ApiData>) =>
    axios.post<ApiData>(endpoints.create, data),
};
// delete by id

//  deleteTodoById:(id:string|number)=>

//     axios.get<ApiData>(endpoints.delete(id))

// update by id
// updateTodoById:(id:string|number)=>
//     axios.get<ApiData>(endpoints.update(id))

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
