import { Link, useLocation } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { JSX, useMemo } from "react";

function Navbar(): JSX.Element {
  const location = useLocation();
  const isCreationPage = useMemo(
    function () {
      return location.pathname === "/create";
    },
    [location.pathname],
  );
  const isEditPage = useMemo(
    function () {
      return isCreationPage || location.pathname.includes("edit");
    },
    [location.pathname],
  );

  return (
    <nav className={classes.navbar}>
      <div className={classes.logo}>📖 Book List</div>
      <div>
        {isEditPage && (
          <Link to="/" className={classes.Button}>
            ← Back to Dashboard
          </Link>
        )}
        {!isCreationPage && (
          <Link to="/create" className={classes.Button}>
            Add a Book
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
