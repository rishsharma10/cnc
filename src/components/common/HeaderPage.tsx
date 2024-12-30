import React from 'react'
import logo from '@/assets/brand-guide/logo.png';
import { Button } from '@/lib/AntRegistry';
import Link from 'next/link'
const HeaderPage = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo.src} alt="error" height={60} width={60} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 ms-auto gap-4 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Page</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link " href="#">Portofolio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="#">Element</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link " href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                        </li>
                        <Link className="nav-item bg-white"  href="/login">
                            <Button>Sign in</Button>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default HeaderPage