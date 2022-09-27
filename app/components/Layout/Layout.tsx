import Footer from "components/Layout/Footer/Footer";
import Header from "components/Layout/Header/Header";
import Head from "next/head";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col mi-h-screen">
            <Head>
                <title>demo sklep</title>
                <meta name="description" content="opis sklepu"></meta>
            </Head>
            <Header />

            <div className="flex-grow">{children}</div>

            <Footer />
        </div>
    );
};
