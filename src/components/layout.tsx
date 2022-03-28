import HeaderMenu from './headerMenu'
import FooterMenu from './footerMenu'
import {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg">
            <HeaderMenu />
            <main>{children}</main>
            <FooterMenu />
        </div>
    )
}