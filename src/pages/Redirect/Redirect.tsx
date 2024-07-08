import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Search } from "../Search/Page";
import { Repository } from "../Repository/Repository";



export const Redirect = () => {
    const router = createBrowserRouter([
  {
    path: "/*",
    element: <Search />,
  },
  {
    path: "/repository/:id",
    element: <Repository />,
  }
]);
  return <RouterProvider router={router} />;
}