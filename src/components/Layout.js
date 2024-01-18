import React from "react";
import Header from "@/components/Head";
import { DM_Sans } from "next/font/google";
const dm = DM_Sans({ subsets: ["latin"] });

export default function Layout(props) {
  return (
    <>
      <Header />
      <main className={`${dm.className}`}>{props.children}</main>
      <footer className="footer">
        <p>Made with ❤ , CSS Grid, Next.JS, React.JS</p>
      </footer>
    </>
  );
}
