import HeaderMenu from "components/HeaderMenu";
import FooterMenu from "components/FooterMenu";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg">
      <HeaderMenu />
      <main>{children}</main>
      <FooterMenu />
    </div>
  );
}
