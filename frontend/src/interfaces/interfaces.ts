import {Dispatch, SetStateAction} from "react";

export interface BooksInterface extends FormDataInterface{
    id: string,

}
export interface  FormDataInterface {
    title: string,
    author: string,
    category: string,
    isbn: number,
    createdAt: string,
    modifiedAt: string,
    isActive: boolean,
}
export interface  BooksCtxInterface {
    setBooks:  Dispatch<SetStateAction<BooksInterface[]>>
    getBook: (bookId: string) => BooksInterface | undefined,
}
