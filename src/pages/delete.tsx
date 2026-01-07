// import { useDeleteTodoById } from "@/services/todo";

// export default function DeleteTodo() {
//   const { mutate: remove } = useDeleteTodoById();

//   return (
//     <div>
//       {/* <button onClick={() => remove()}>Delete Todo</button> */}
//     </div>
//   );
// }
// import { TodoApi, useDeleteTodoById } from '@/services/todo'
// import React from 'react'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/Components/ui/dropdown-menu";
// import { Button } from '@/Components/ui/button';
// export default function Delete() {
//     const{mutateAsync: remove}=useDeleteTodoById();

//   return (
//     <div>
//           <DropdownMenu modal={false}>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost">...</Button>
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent>
//                       <DropdownMenuItem>Edit</DropdownMenuItem>

//                       <DropdownMenuItem
//                         variant="destructive"
//                         onClick={() => ()}
//                       >
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//     </div>
//   )
// }
