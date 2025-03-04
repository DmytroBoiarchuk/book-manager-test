import {
  Context,
  createContext,
  JSX,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BooksCtxInterface, BooksInterface } from "../interfaces/interfaces.ts";

export const ctxInitialValue: BooksCtxInterface = {
  setBooks: () => {},
  getBook: () => undefined,
};

export const BooksContext: Context<BooksCtxInterface> =
  createContext(ctxInitialValue);

function BooksContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [books, setBooks] = useState<BooksInterface[]>([]);

  const getBook = useCallback(
    function (bookId: string) {
      return books.find((book) => book.id === bookId);
    },
    [books],
  );

  const booksCtxValue: BooksCtxInterface = useMemo(
    function () {
      return {
        setBooks,
        getBook,
      };
    },
    [getBook],
  );

  return (
    <BooksContext.Provider value={booksCtxValue}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksContextProvider;
