import {BooksInterface, FormDataInterface} from "../interfaces/interfaces.ts";

// get
export  async function getBooks(): Promise<BooksInterface[]> {
        const apiUrl: string = `http://localhost:3000/books`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
            );
        }
        return  await response.json();
}

//get :id
export  async function getSingleBook(bookId: string):Promise<BooksInterface> {
    const apiUrl: string = `http://localhost:3000/books/${bookId}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
        );
    }
    return  await response.json();
}

// put
export async function putRequest(bookId: string, payload: BooksInterface): Promise<BooksInterface> {
  const apiUrl: string = `http://localhost:3000/books/${bookId}`;
  const response = await fetch(apiUrl,
      {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
    );
  }
  return await response.json();
}

// delete
export async function deleteRequest(bookId: string): Promise<BooksInterface> {
    const apiUrl: string = `http://localhost:3000/books/${bookId}`;
    const response = await fetch(apiUrl,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
        );
    }
    return await response.json();
}

// post
export async function postRequest( payload: FormDataInterface): Promise<BooksInterface> {
    const apiUrl: string = `http://localhost:3000/books/`;
    const response = await fetch(apiUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            `Error with status: ${response.status.toString()}. Reason: ${errorData.message}`,
        );
    }
    return await response.json();
}
