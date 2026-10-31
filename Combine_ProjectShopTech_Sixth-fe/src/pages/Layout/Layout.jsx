import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Outlet } from "react-router-dom";
import ChatWidget from "../../components/ChatWidget";
import { useTranslation } from 'react-i18next';

function Layout() {
  const { t } = useTranslation();

    return (
        <>
            <Header />
            {/* Add padding-top to prevent content from being hidden behind fixed header */}
            <main className="pt-[120px]">
                <Outlet></Outlet>
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default Layout;

