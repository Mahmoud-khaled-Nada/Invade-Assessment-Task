import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import AuthenticationGuard from "./guard/AuthenticationGuard";
import { AuthPage } from "./pages/AuthPage";
import { Page404 } from "./pages/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthenticationGuard>
        <HomePage />
      </AuthenticationGuard>
    ),
    children: [/** {} pages */],
  },
  {
    path: "/guest",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;