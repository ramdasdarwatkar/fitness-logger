import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { LoginPage } from "../auth/LoginPage";
import { HomePage } from "../home/HomePage";
import { LoggingPage } from "../logging/LoggingPage";
import { LogbookPage } from "../logbook/LogbookPage";
import { ExercisesPage } from "../exercises/ExercisesPage";
import { RequireAuth } from "../auth/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "logging/:sessionId",
        element: <LoggingPage />,
      },
      {
        path: "logbook/:sessionId",
        element: <LogbookPage />,
      },
      {
        path: "exercises",
        element: <ExercisesPage />,
      },
    ],
  },
]);
