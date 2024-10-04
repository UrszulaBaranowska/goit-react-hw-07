import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  return (
    <input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      className={styles.input}
    />
  );
};

export default SearchBox;
