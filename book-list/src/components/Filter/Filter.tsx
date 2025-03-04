import { ChangeEvent, Dispatch, JSX, SetStateAction } from "react";
import { FilterTypes } from "../../interfaces/types.ts";

function Filter({
  setCategory,
}: {
  setCategory: Dispatch<SetStateAction<FilterTypes>>;
}): JSX.Element {
  function onChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value as FilterTypes);
  }
  return (
    <select onChange={onChangeHandler} defaultValue={"Show Active"}>
      <option value={"Show Active"}>Show Active</option>
      <option value={"Show All"}>Show All</option>
      <option value={"Show Deactivated"}>Show Deactivated</option>
    </select>
  );
}

export default Filter;
