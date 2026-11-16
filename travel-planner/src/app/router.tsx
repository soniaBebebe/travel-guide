import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardPage } from "@/pages/dashboardPage";
import { TripDetailPage } from "@/pages/TripDetailPage";

const router = createBrowserRouter([
    {path:'/', element: <DashboardPage/>},
    {path:'/trips/:id', element: <TripDetailPage/>},
]);

export const Router = () => <RouterProvider router ={router}/>;