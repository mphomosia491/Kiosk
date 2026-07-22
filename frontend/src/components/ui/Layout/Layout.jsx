import Navbar from "../Navbar/Navbar";
import "./layout.css"

function Layout ({ children }) {
    return (
        <>
            <Navbar />

            <main className="app-layout">
                {children}
            </main>
        </>
    );
}

export default Layout;