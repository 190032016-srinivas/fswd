import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateBookForm } from "./Components/AddBook.jsx";
import { ShowBook } from "./Components/ShowBooks.jsx";
import { GlobalProvider } from "./utils/GlobalData.jsx";
import BookDetails from "./Components/BookDetails.jsx";
import { ErrorElement } from "./Components/ErrorElement.jsx";
import { Provider } from "react-redux";
import store from "./utils/store.js";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ShowBook />,
      },
      {
        path: "/browse/:category",
        element: <ShowBook />,
      },
      {
        path: "/Add",
        element: <CreateBookForm />,
      },
      {
        path: "/book/:title",
        element: <BookDetails />,
      },
    ],
    errorElement: <ErrorElement />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router={appRouter} />
    </GlobalProvider>
  </Provider>
);
