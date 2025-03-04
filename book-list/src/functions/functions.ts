import {BooksInterface} from "../interfaces/interfaces.ts";
import {FilterTypes} from "../interfaces/types.ts";

export function filterBy(filter: FilterTypes, books: BooksInterface[]) {
    if(filter === 'Show Active') {
        return books.filter(book => book.isActive)
    }
    if(filter === 'Show Deactivated') {
        return books.filter(book => !book.isActive)
    }
    return books
}
 export function formatDate  (date: Date): string  {
     return new Intl.DateTimeFormat("en-GB", {
         day: "2-digit",
         month: "long",
         year: "numeric",
         hour: "2-digit",
         minute: "2-digit",
         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
     }).format(date);
 };
