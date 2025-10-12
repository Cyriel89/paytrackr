import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
//import TransactionsPage from "./pages/transactions/TransactionsPage";

const requireAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw redirect("/login");
    }
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage />, },
  //{ path: "/transactions", element: <TransactionsPage />, loader: requireAuth, },
  //{ path: "/", element: <TransactionsPage />, loader: requireAuth, },
]);

export default function AppRouter() { return <RouterProvider router={router} />; }