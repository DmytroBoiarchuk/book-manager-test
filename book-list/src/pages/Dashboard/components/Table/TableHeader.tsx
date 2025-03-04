import { JSX } from "react";

function TableHeader(): JSX.Element {
  return (
    <thead>
      <tr>
        <th>Book Title</th>
        <th>Author Name</th>
        <th>Category</th>
        <th>ISBN</th>
        <th>Created At</th>
        <th>Modified At</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
