import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Progres from "../pages/progress";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <Home />,
  },
  {
    path: "/progress/:id",
    element: <Progres />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;