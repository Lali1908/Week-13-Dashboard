import Link from "next/link";

export default function NavbarAdmin() {
    return (
        <nav className="navbar navbar-expand-lg  bg-danger">
            <div className="container">

                <Link className="navbar-brand text-white" href="/">
                    NextShop
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <div className="navbar-nav ms-auto">

                        <Link className="nav-link text-white" href="/admin">
                            Home
                        </Link>

                         <Link className="nav-link text-white" href="/admin/products">
                                        สินค้า
                        </Link>

                        

                         

                    </div>
                </div>

            </div>
        </nav>
    );
}

