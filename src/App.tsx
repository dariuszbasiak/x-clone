import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootPage } from "./pages/RootPage";
import { Error404Page } from "./pages/Error404Page";
import { LoginPage } from "./pages/LoginPage";
import { BoardPage, getPosts } from "./pages/BoardPage";
import { UserPostsPage } from "./pages/UserPostsPage";
import { SignupPage } from "./pages/SignupPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/",
        element: <BoardPage />,
        loader() {
          return getPosts();
        },
      },
      {
        path: "/user-posts",
        children: [
          {
            path: ":id",
            element: <UserPostsPage />,
            loader({ params }) {
              return getPosts(params.id);
            },
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
