import { Outlet } from "react-router";
import NavBar from "../NavBar/NavBar.tsx";
import Footer from "../Footer/Footer.tsx";
import { JSX } from "react";

function RootLayout(): JSX.Element {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
