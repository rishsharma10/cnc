import { AntForm, Button, Col, FormItem, Input, Row } from '@/lib/AntRegistry'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/brand-guide/logo.png';
import CrumbIcons from '../CrumbIcons';

const FooterPage = () => {
    return (
        <>
            <section className="about-section">
                <div className="container">
                    <Row justify={"center"}>
                        <Col span={24} md={20} lg={18} xl={10} xxl={9}>
                            <div className="about-content text-center">
                                <div className="logo mb-4">
                                    <img src={logo.src} alt="error" height={120} width={110} />
                                </div>
                                {/* <p className="fs-6 mb-5">“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor

                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,

                                    nostrud exercitation ullamco laboris.”</p> */}

                                <ul className="list-unstyled mb-5 p-0">
                                    <li>
                                        <h4 className="text-uppercase">Stores</h4>
                                    </li>
                                    <li>KAABIZ BAKES PRIVATE LIMITED</li>
                                    <li>GST NO. 062400171112TRN</li>
                                    <li>+91 9915708181</li>
                                    <li>Sco 6 sector 16, PANCHKULA 134109</li>
                                </ul>
                                <AntForm>
                                    <h4 className="mb-3">News As Fresh As Our Coffee</h4>
                                    <FormItem>
                                        <Input className="border border-light py-0 pe-0" placeholder="Your E-mail Address..." suffix={<Button className="bg-white py-3 h-100 px-4"><CrumbIcons.Email /></Button>} />
                                    </FormItem>
                                </AntForm>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <div className="footer">
                <div className="container">
                    <Row>
                        <Col span={24}>
                            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-between gap-4">
                                <p className="m-0">© Copyright ©2025 COPPER & CRUMB. Powered by Techharbor Partners
</p>

                                <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                                    <li><Link href={'/pages/privacy-policy'}>Privacy policy</Link></li>
                                    <li><Link href={'/pages/return-policy'}>Return policy</Link></li>
                                    <li><Link href={'/pages/terms-and-conditions'}>Terms & Conditions</Link></li>
                                    <li><Link href={'/pages/contact-us'}>Contact Us</Link></li>
                                </ul>
                                <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                                    <li><Link href={'/'}><i className="fa-brands fa-facebook"></i></Link></li>
                                    <li><Link href={'/'}><i className="fa-brands fa-square-instagram"></i></Link></li>
                                    <li><Link href={'/'}><i className="fa-brands fa-twitter"></i></Link></li>
                                    <li><Link href={'/'}><i className="fa-brands fa-linkedin"></i></Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default FooterPage