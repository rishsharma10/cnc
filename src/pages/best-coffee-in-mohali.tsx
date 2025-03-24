import CommonLayout from '@/components/common/CommonLayout'
import React, { Fragment, ReactElement } from 'react'
import { Layout, Typography, Card, Row, Col, Carousel } from "antd";
import Head from 'next/head';
import CommonBanner from '@/components/CommonBanner';
import titleSeperator from '@/assets/brand-guide/title-separator.png'
import aboutBanner from '@/assets/brand-guide/title-above.png';
import titleImage from '@/assets/brand-guide/title-separator.png';
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import blog2 from '@/assets/images/delicious-coffee-cup-table.jpg';
import blog3 from '@/assets/images/front-view-cake-slice-with-cream-fresh-red-strawberries-inside-plate-getting-sugar-powder-dark-background.jpg'
import { TypographyTitle } from '@/lib/AntRegistry';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const BestInMohali = () => {

    const reviews = [
        {
            title: "My Go-To Place for a Relaxing Coffee",
            content:
                "I have been visiting Copper & Crumb for a year now. A perfect ambiance for spending some quality time. What I loved most was how they provided a homely vibe. This iconic cafe in Mohali is a top recommendation from my side."
        },
        {
            title: "Copper & Crumb is Simply The Best",
            content:
                "Copper & Crumb is more than just providing fresh coffee. I love how they use authentic French techniques and mix them with desi flavor. Don’t forget to try the pastry program, and you will have a delightful experience."
        },
        {
            title: "Mohali’s Best Coffee Break",
            content:
                "A place where you can connect with your roots while exploring French flavors. Probably the best cafe in Mohali that promotes Indo-French fusion without skipping the authenticity. You will have the best time here."
        },
        {
            title: "An Indo-French Delight",
            content:
                "I got to know about Copper & Crumb through my best friend. It has become my favorite coffee place in Mohali. Their pastries can give you a next-level experience. 100% recommended for everyone."
        }
    ];
    const stateData = [
        {
            count: 250,
            title: 'Classic Indo-French Pastry Program',
            desc: "Our dedicated team blends Indian emotions with French techniques to craft a signature pastry program. Try out our most loved pastries to have a next-level cafe experience."
        },
        {
            count: 126,
            title: 'A Fusion Coffee Delight',
            desc: "Copper & Crumb maintains its uniqueness by providing rich, classic-style coffee made of Indo-French techniques. Every sip of our coffee will give you an unmatchable experience."
        },
    ]
    return (
        <Fragment>
            <Head>
                <title>Have a Relaxing Coffee in the Best Cafe in Mohali</title>
                <meta name='desription' content={`Are you in search of a perfect coffee place? Mohali has the best Indo-French retreat to enhance your culinary experience. Copper & Crumb is the best Mohali cafe with a touch of classiness.`} />
            </Head>
            <CommonBanner title={"Best coffee in Mohali"} />
            <section>
                <div className="container mt-sm-0 pt-0">
                    <Row gutter={[20, 20]} justify={'center'}>
                        <Col span={24} lg={16} xl={14} xxl={12} className='text-center'>
                            <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
                            <h4 className="title mb-4">
                                Copper & Crumb
                            </h4>
                            <h6 className="fw-semibold fs-4 mb-4">
                                The Finest Indo-French Cafe in Mohali
                            </h6>
                            <p className="sub-title">
                                We specialize in blending Indian flavor with traditional French techniques to create something revolutionary. Copper & Crumb is an iconic cafe in Mohali that maintains the Indo-French fusion with perfection. Our team has been crafting something magical to enhance your culinary experience. We are experts in mixing up traditional copper pots with advanced espresso machines to create something beyond amazing. Whether you are craving a refreshment or want to surprise your spouse with a classic coffee date, Copper & Crumb can be your perfect destination.
                            </p>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="blog-section common-bg-2">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col span={24} md={12} lg={8} sm={24}>
                            <div className="full-width-image">
                                <img src={blog3.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>Experience the Taste of Perfection</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    Copper & Crumb is uniquely styled to represent the Indo-French fusion. We take pride in blending artistic ambiance with exceptional recipes without missing the significance of the roots. Our team specializes in unique culinary arts that give the perfect mix of Indian and French flavors. Savor the authentic taste of perfection with each item crafted with love.
                                </p>
                            </div>
                        </Col>
                        <Col span={24} md={12} lg={8} sm={24}>
                            <div className="full-width-image">
                                <img src={blog2.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>Copper & Crumb Back Story</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    Copper & Crumb has been inspiring people for years with a beautiful backstory. We started our journey with a vision of two dreamers: Kannupriya and Utkarsh. After meeting at a school get-together, they shared the dream of connecting Indian cuisine with traditional French techniques. The journey was no less than a rollercoaster, as you can feel a touch of tenderness with every sip of coffee.
                                </p>
                            </div>
                        </Col>
                        <Col span={24} md={12} lg={8} sm={24}>
                            <div className="full-width-image">
                                <img src={blogImage.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>A Cafe That Promotes Sustainability</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    As the best cafe in Mohali, Copper & Crumb encourages sustainability. Our team has been working with local farmers to maintain the freshness of all cuisines. We are working with dedicated women to promote culinary arts at the local level.
                                </p>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
            <section className="offer-section common-bg-1">
                <div className="container">
                    <Row justify={"center"} className="mb-5">
                        <Col span={24} md={20} lg={16} xl={14} className="text-center">
                            <h2 className="title">Discover Our Signature Creations
                            </h2>
                            <img src={titleSeperator.src} alt="error" className="title-seperator" />

                        </Col>
                    </Row>
                    <Row gutter={[14, 14]} justify={'center'}>
                        {stateData.map((res: any) => <Col key={res} span={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <div className="offered-items-container text-center h-100 p-4">
                                <h4 className="mt-3 mb-3">{res.title}</h4>
                                <p className="text-dark ">{res.desc}</p>
                            </div>
                        </Col>)}
                    </Row>
                </div>
            </section>
            <section className="about-testimonial fixed-banner-section-1 h-auto">
                <div className="container ">
                    <Row justify={'center'}>
                        <Col span={24} lg={20} xl={18} xxl={16}>
                            <Carousel draggable={false}>
                                {reviews.map((res: any) => <div key={res} className="about-testimonial-card pb-5">
                                    <h4 className="title mb-3">Words From Happy Customers!</h4>
                                    <div className='mb-4 mb-sm-5'><img src={titleImage.src} alt="error" style={{ filter: 'sepia' }} className='mx-auto' /></div>
                                    <TypographyTitle className='text-white' level={5}>{`‘${res.title}’`}</TypographyTitle>
                                    <p className='fs-6'>{res.content}</p>
                                </div>)}
                            </Carousel>
                        </Col>
                    </Row>
                </div>
            </section>
        </Fragment>
    )
}
BestInMohali.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export default BestInMohali