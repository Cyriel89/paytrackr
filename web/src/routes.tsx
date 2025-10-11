import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import TransactionsPage from "./pages/transactions/TransactionsPage.tsx";

const requireAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw redirect("/login");
    }
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage />, loader: requireAuth, },
  { path: "/transactions", element: <TransactionsPage />, loader: requireAuth, },
  { path: "/", element: <TransactionsPage />, loader: requireAuth, },
]);

export default function AppRouter() { return <RouterProvider router={router} />; }