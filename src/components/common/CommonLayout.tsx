import React from 'react'
import HeaderPage from './HeaderPage'
import FooterPage from './FooterPage'

const CommonLayout = ({ children }: any) => {
    return (
        <>
            <header>
                <HeaderPage />
            </header>
            <main className="main">{children}</main>
            <footer>
                <FooterPage />
            </footer>
        </>
    )
}

export default CommonLayout