import classes from "./Footer.module.scss";
import { JSX } from "react";
function Footer(): JSX.Element {
  return (
    <footer className={classes.footer}>
      <p>
        Made with ❤️ by{" "}
        <a href="https://github.com/DmytroBoiarchuk" target="_blank">
          Dmytro Boiarchuk
        </a>
      </p>
    </footer>
  );
}

export default Footer;
