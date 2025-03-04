import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout/RootLayout.tsx";
import BookForm from "./pages/BookForm/BookForm.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import BooksContextProvider from "./context/BooksListCtx.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/create",
        element: <BookForm />,
      },
      {
        path: "/edit/:bookId",
        element: <BookForm />,
      },
    ],
  },
]);
function App() {
  return (
    <BooksContextProvider>
      <RouterProvider router={router} />
    </BooksContextProvider>
  );
}

export default App;
