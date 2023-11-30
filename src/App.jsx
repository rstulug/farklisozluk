import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "posts/:postSlug",
        element: <Posts />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "/users/:usernameSlug",
        element: <Users />,
      },
      {
        path: "/account/:usernameSlug",
        element: <Account />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
            zIndex: "10000",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
