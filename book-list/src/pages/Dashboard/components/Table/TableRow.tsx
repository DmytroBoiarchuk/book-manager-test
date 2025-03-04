import { BooksInterface } from "../../../../interfaces/interfaces.ts";
import classes from "./Table.module.scss";
import { JSX, useState } from "react";
import { usePutQuery } from "../../../../hooks/usePutQuery.ts";
import { deleteRequest } from "../../../../functions/requests.ts";
import MyModal from "../../../../components/ErrorModal/MyModal.tsx";
import { useDebounce } from "../../../../hooks/useDebounce.ts";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../functions/functions.ts";

function TableRow({
  book,
  renewList,
}: {
  book: BooksInterface;
  renewList: () => Promise<void>;
}): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(book.isActive);
  const [error, setError, setPayload] = usePutQuery(book.id);
  const [errorModalIsShown, setErrorModalIsShown] = useState<boolean>(false);

  function putRequest(isActive: boolean) {
    setPayload({ ...book, isActive })
      .then(() => {
        renewList();
      })
      .catch(() => {
        setErrorModalIsShown(true);
        setIsActive((prevState) => !prevState);
      });
  }
  const debouncedFn = useDebounce(putRequest, 500);

  function toggleIsActive() {
    setIsActive((prevState) => {
      debouncedFn(!prevState);
      return !prevState;
    });
  }

  async function deleteBook() {
    if (!isActive) {
      try {
        await deleteRequest(book.id);
        await renewList();
      } catch (error) {
        setError(error as Error);
        setErrorModalIsShown(true);
      }
    }
  }

  return (
    <>
      <tr className={!isActive ? classes.active : ""}>
        <td>
          <div>{book.title}</div>
        </td>
        <td>
          <div>{book.author}</div>
        </td>
        <td>{book.category}</td>
        <td>{book.isbn}</td>
        <td>
          <div>{formatDate(new Date(book.createdAt))}</div>
        </td>
        <td>
          <div>
            {book.modifiedAt !== "--"
              ? formatDate(new Date(book.modifiedAt))
              : book.modifiedAt}
          </div>
        </td>
        <td>
          <div className={classes.buttonsContainer}>
            <Link to={`/edit/${book.id}`}>Edit</Link>
            <button onClick={toggleIsActive}>
              {isActive ? "Deactivate" : "Re-Activate"}
            </button>
            <button onClick={deleteBook} disabled={isActive}>
              Delete
            </button>
          </div>
        </td>
      </tr>
      <MyModal
        modalIsShown={errorModalIsShown}
        setModalIsShown={setErrorModalIsShown}
      >
        <div>
          <button onClick={() => setErrorModalIsShown(false)}>X</button>
          <span className={classes.errorStyle}>Error:</span>
          <p>{error?.message}</p>
        </div>
      </MyModal>
    </>
  );
}

export default TableRow;
