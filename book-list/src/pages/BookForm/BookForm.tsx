import { useNavigate, useParams } from "react-router";
import { getSingleBook, postRequest } from "../../functions/requests.ts";
import { FormEvent, JSX, useContext, useEffect, useState } from "react";
import {
  BooksInterface,
  FormDataInterface,
} from "../../interfaces/interfaces.ts";
import { BooksContext } from "../../context/BooksListCtx.tsx";
import { usePutQuery } from "../../hooks/usePutQuery.ts";
import MyModal from "../../components/ErrorModal/MyModal.tsx";
import classes from "./BookForm.module.scss";

function BookForm(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();

  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<BooksInterface | undefined>();

  const context = params ? useContext(BooksContext) : undefined;
  const [error, setError, putQuery] = usePutQuery(params.bookId ?? "");

  useEffect(() => {
    if (context && params.bookId) {
      const edBook = context.getBook(params.bookId);
      setEditingBook(edBook);
    }
    // if page reloaded - fetch single book
    if (params.bookId && !context?.getBook(params.bookId)) {
      getSingleBook(params.bookId).then((r) => setEditingBook(r));
    }
  }, [context]);

  async function submitFormHandler(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);

    try {
      if (editingBook) {
        await putQuery({
          ...formObject,
          createdAt: editingBook.createdAt,
          modifiedAt: new Date().toISOString(),
          isActive: editingBook.isActive,
          id: params.bookId,
        } as BooksInterface);
      } else {
        await postRequest({
          ...formObject,
          createdAt: new Date().toISOString(),
          modifiedAt: "--",
          isActive: true,
        } as FormDataInterface);
      }
      setModalIsShown(true);
    } catch (error) {
      setModalIsShown(true);
      setError(error as Error);
    }
  }
  function handleCloseModal() {
    setModalIsShown(false);
    if (error) {
      setError(undefined);
    } else {
      navigate("/");
    }
  }
  return (
    <main>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h1>{`${params.bookId ? "Edit" : "Add"} a book`}</h1>
        <p>
          <label htmlFor="title">Book title</label>
          <input
            defaultValue={editingBook?.title}
            type="text"
            name="title"
            required
          />
        </p>
        <p>
          <label htmlFor="author">Author name</label>
          <input
            defaultValue={editingBook?.author}
            type="text"
            name="author"
            required
          />
        </p>
        <p>
          <label htmlFor="category">Category</label>
          <select defaultValue={editingBook?.category} name="category">
            <option value="Fiction">Fiction</option>
            <option value="Poetry">Poetry</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
            <option value="Self-help">Self-help</option>
          </select>
        </p>
        <p>
          <label htmlFor="International Standard Book Number (ISBN)">
            International Standard Book Number (ISBN)
          </label>
          <input
            defaultValue={editingBook?.isbn}
            type="number"
            name="isbn"
            required
          />
        </p>
        <button type="submit">{`${params.bookId ? "Edit" : "Add a"} book`}</button>
      </form>
      <MyModal modalIsShown={modalIsShown} setModalIsShown={setModalIsShown}>
        <div>
          <button onClick={handleCloseModal}>X</button>
          <span>{error ? "Error: " : "Success!"}</span>
          <p>
            {error
              ? error.message
              : `Book successfully ${editingBook ? "added" : "updated"} `}
          </p>
        </div>
      </MyModal>
    </main>
  );
}

export default BookForm;
