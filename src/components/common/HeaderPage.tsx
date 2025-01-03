import React from 'react'
import logo from '@/assets/brand-guide/logo.png';
import { Button } from '@/lib/AntRegistry';
import Link from 'next/link'
import { useRouter } from 'next/router';
const HeaderPage = () => {

    const router = useRouter()
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <img src={logo.src} alt="error" height={60} width={60} />
                </Link>
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 ms-auto gap-2 gap-lg-4 mb-lg-0">
                        <Link className="nav-item"  href="/" legacyBehavior>
                            <a className="nav-link active" aria-current="page">Home</a>
                        </Link>
                        <Link className="nav-item"  href="/products/search/1" legacyBehavior>
                            <a className="nav-link">Shop</a>
                        </Link>
                        <Link className="nav-item"  href="/about" legacyBehavior>
                            <a className="nav-link">About us</a>
                        </Link>
                        <Link className="nav-item"  href="/our-story" legacyBehavior>
                            <a className="nav-link">Our story</a>
                        </Link>
                        <Link className="nav-item"  href="/contact" legacyBehavior>
                            <a className="nav-link">Contact us</a>
                        </Link>
                        <Link className="nav-item" href="/viewcart" legacyBehavior>
                            <a className="nav-link" >Cart</a>
                        </Link>
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
                        {/* <Link className="nav-item bg-white"  href="/login"> */}
                            <Button onClick={() => router.replace(`/login`)} className='text-white' type='primary'>Sign in</Button>
                        {/* </Link> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default HeaderPage