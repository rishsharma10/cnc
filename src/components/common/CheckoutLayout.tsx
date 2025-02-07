import React from 'react'
import HeaderPage from './HeaderPage'
import FooterPage from './FooterPage'
import { Grid } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Col } from '@/lib/AntRegistry'

const CheckLayout = ({ children }: any) => {
    const screens = Grid.useBreakpoint()
    return (
        <>
            <header>
                <nav className="navbar py-3 px-5 navbar-expand-lg ">
                    <div className="container-fluid">
                        <Link className="navbar-brand p-0" href="/">
                            <h1 className='logo-text'>Copper & Crumb</h1>
                        </Link>
                        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 ms-auto gap-2 gap-lg-3 mb-lg-0 align-items-center">
                                <Link className="nav-item" href="/viewcart" legacyBehavior>
                                    <a className="nav-link" ><ShoppingCartOutlined /></a>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="main">{children}</main>
            <footer>
                    <div className="">
                        <ul className="list-unstyled m-0 p-0 gap-4 d-flex">
                            <li> <div className="line"></div> <Link href={'/pages/privacy-policy'}>Privacy policy</Link></li>
                            <li><div className="line"></div><Link href={'/pages/return-policy'}>Return policy</Link></li>
                            <li><div className="line"></div><Link href={'/pages/terms-and-conditions'}>Terms & Conditions</Link></li>
                            <li><div className="line"></div><Link href={'/pages/contact-us'}>Contact Us</Link></li>
                        </ul>
                    </div>
            </footer>
        </>
    )
}

export default CheckLayout