import {useCallback, useContext, useEffect, useState} from "react";
import {BooksInterface} from "../interfaces/interfaces.ts";
import {getBooks} from "../functions/requests.ts";
import {BooksContext} from "../context/BooksListCtx.tsx";

export function useGetQuery() {
    const [books, setBooks] = useState<BooksInterface[]>([]);
    const [error, setError] = useState<Error>();
    const context = useContext(BooksContext);
    const [isLoading, setIsLoading] = useState(false);
    const getFn = useCallback(async function () {
        try {
            setIsLoading(true);
            const response = await getBooks();
            setBooks(response);
            context.setBooks(response);
        }catch (error) {
            setError(error as Error);
        }finally {
            setIsLoading(false);
        }
    }, [])
    useEffect(() => {
        getFn();
    }, []);
    return [books, getFn, error,setError, isLoading] as const
}
