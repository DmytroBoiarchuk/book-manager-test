import { useCallback, useState } from "react";
import { BooksInterface } from "../interfaces/interfaces.ts";
import { putRequest } from "../functions/requests.ts";

export function usePutQuery(id: string) {
  const [error, setError] = useState<Error>();
  const put = useCallback(
    async function (payload: BooksInterface) {
      try {
        if (payload)
          await putRequest(id, payload);
      } catch (error) {
        setError(error as Error);
        throw error;
      }
    },
    [id],
  );

  return [error,setError, put] as const;
}
