import Footer from "components/Layout/footer/footer";
import Header from "components/Layout/header/header";
import Head from "next/head";
import Navigation from "components/Layout/header/navigation";
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

            <Header>
                <Navigation />
            </Header>

            <div className="flex-grow">{children}</div>

            <Footer />
        </div>
    );
};
