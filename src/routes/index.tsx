import { createBrowserRouter, Navigate } from "react-router";
import Main from "../layouts/Main/Main";
import Auth from "../layouts/Auth/Auth";
import NotFoundPage from "../app/NotFoundPage";
import { dashboardItems } from "../constants/router.constants";
import { routesGenerators } from "../lib/helpers/routesGenerators";
import SignIn from "../app/Auth/SignIn";
import ForgotPassword from "../app/Auth/ForgotPassword";
import VerifyEmail from "../app/Auth/VerifyEmail";
import ResetPassword from "../app/Auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <RouteProtector>
        <Main />
      // </RouteProtector>
    ),
    children: routesGenerators(dashboardItems),

    // errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Navigate to="sign-in" replace />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
        index: true,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
