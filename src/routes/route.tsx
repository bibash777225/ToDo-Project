
import { createBrowserRouter } from "react-router-dom";

import ViewTodo from "@/pages/home/partials/view";
import About from "@/pages/home/Home";
import CreateTodo from "@/pages/home/partials/create";
import { ErrorPage, } from "@/pages/home/partials/error";
import Info from "@/pages/home/partials/info";
import Form from "@/pages/home/form";


export const router = createBrowserRouter([
  {
    path: "/",
    element:< About/>,//home page 
    errorElement:<ErrorPage></ErrorPage>
  },
  {
    path: "/view/:id",
    element: <ViewTodo />,  // view particular TOdo by id 
  },
  {
    path: "/create",
    element: <CreateTodo />,  // view particular TOdo by id 
  },
  {
    path:"/info",
    element:<Info/>,
  },
//   {
// path:"/form",
// element:<Form/>

//   }
 
]);
