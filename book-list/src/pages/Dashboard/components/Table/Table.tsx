import TableHeader from "./TableHeader.tsx";
import TableRow from "./TableRow.tsx";
import classes from "./Table.module.scss";
import { FaSpinner } from "react-icons/fa6";

import { useGetQuery } from "../../../../hooks/useGetQuery.ts";
import MyModal from "../../../../components/ErrorModal/MyModal.tsx";
import { JSX, useEffect, useState } from "react";
import Filter from "../../../../components/Filter/Filter.tsx";
import { filterBy } from "../../../../functions/functions.ts";
import { FilterTypes } from "../../../../interfaces/types.ts";
import { BooksInterface } from "../../../../interfaces/interfaces.ts";

function Table(): JSX.Element {
  const [books, renewList, error, setError, isLoading] = useGetQuery();
  const [errorModalIsShown, setErrorModalIsShown] = useState<boolean>(false);
  const [category, setCategory] = useState<FilterTypes>("Show Active");
  const [filteredBooks, setFilteredBooks] = useState<BooksInterface[]>(books);

  function handleCloseModal() {
    setErrorModalIsShown(false);
    setError(undefined);
  }

  useEffect(() => {
    if (books) setFilteredBooks(filterBy(category, books));
  }, [category, books]);

  useEffect(() => {
    if (error) setErrorModalIsShown(true);
  }, [error]);

  return (
    <>
      <div className={classes.filterContainer}>
        <Filter setCategory={setCategory} />
        <p>{`Showing ${filteredBooks.length} of ${books.length}`}</p>
      </div>
      <table className={classes.table}>
        <TableHeader />
        <tbody>
          {filteredBooks.map((book) => (
            <TableRow key={book.id} book={book} renewList={renewList} />
          ))}
        </tbody>
        <MyModal
          modalIsShown={errorModalIsShown}
          setModalIsShown={setErrorModalIsShown}
        >
          <div>
            <button onClick={handleCloseModal}>X</button>
            <span className={classes.errorStyle}>Error:</span>
            <p>{error?.message}</p>
          </div>
        </MyModal>
      </table>
      {isLoading && (
        <div className={classes.loadingSpinner}>
          <FaSpinner size={50} />
        </div>
      )}
    </>
  );
}

export default Table;
