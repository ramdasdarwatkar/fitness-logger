import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { RequireAuth } from "../auth/RequireAuth";
import { MainLayout } from "../layout/MainLayout";
import LoginPage from "../auth/LoginPage";

const HomePage = lazy(() => import("../home/HomePage"));
const LoggingPage = lazy(() => import("../logging/LoggingPage"));
const LogbookPage = lazy(() => import("../logbook/LogbookPage"));
const ExercisesPage = lazy(() => import("../exercises/ExercisesPage"));
const ExerciseDetailsPage = lazy(
  () => import("../exercises/ExerciseDetailsPage"),
);
const ProfilePage = lazy(() => import("../profile/ProfilePage"));
const ProgressPage = lazy(() => import("../progress/ProgresPage"));

export const router = createBrowserRouter(
  [
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
        { index: true, element: <HomePage /> },
        { path: "logging/:sessionId", element: <LoggingPage /> },
        { path: "logbook/:sessionId", element: <LogbookPage /> },
        { path: "exercises", element: <ExercisesPage /> },
        { path: "exercise/:exerciseId", element: <ExerciseDetailsPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "progress", element: <ProgressPage /> },
      ],
    },
  ],
  {
    basename: "/fitness-logger", // 🔥 THIS IS THE FIX
  },
);
