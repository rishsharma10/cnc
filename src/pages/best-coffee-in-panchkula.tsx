import CommonLayout from '@/components/common/CommonLayout'
import React, { Fragment, ReactElement } from 'react'
import { Layout, Typography, Card, Row, Col, Carousel } from "antd";
import Head from 'next/head';
import CommonBanner from '@/components/CommonBanner';
import titleSeperator from '@/assets/brand-guide/title-separator.png'
import titleImage from '@/assets/brand-guide/title-separator.png';
import titleImage1 from '@/assets/images/shop-roasted-texture-tone-wood (1).jpg';
import aboutBanner from '@/assets/brand-guide/title-above.png';
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import blog2 from '@/assets/images/delicious-coffee-cup-table.jpg';
import blog3 from '@/assets/images/front-view-cake-slice-with-cream-fresh-red-strawberries-inside-plate-getting-sugar-powder-dark-background.jpg'
import { TypographyTitle } from '@/lib/AntRegistry';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const BestInPanchkula = () => {

    const reviews = [
        {
            title: "Best Weekend Treat in Town",
            content:
                "Astonishing ambiance. Copper & Crumb has become my go-to place to have coffee. Seriously, it's the best Panchkula cafe at the moment. The delicious collection of pastries gives me a homely feeling."
        },
        {
            title: "Panchkula’s Hidden Gem",
            content:
                "If you are looking for a nice classic cafe in Panchkula, Copper & Crumb can give you the ultimate experience. I loved their dedication to blending Indo-French techniques. Perfect place for cafe lovers."
        },
        {
            title: "My Favorite Venue in Panchkula",
            content:
                "I have been visiting Copper & Crumb for the last few months. Hands down, it’s the perfect cafe in Panchkula right now. You can explore different French-style coffees here."
        },
        {
            title: "Best Indo-French Discovery",
            content:
                "I first visited Copper & Crumb with my friends and was blown away by the theme of the cafe. They are maintaining Indian authenticity while serving French flavor. Top recommended cafe Panchkula."
        }
    ];
    const stateData = [
        {
            count: 250,
            title: 'Indo-French Pastry Program',
            desc: "Our pastry program is the perfect mix of Indian inspiration and traditional French techniques. Each item tells a story of culinary arts, dedication, and love. Try out our signature pastry items to have an extraordinary experience."
        },
        {
            count: 126,
            title: 'Classic-Style Coffee',
            desc: "Copper & Crumb takes pride in becoming the best cafe Panchkula, experimenting with Indo-French techniques. We mix classic techniques with modernity to give you perfectly brewed coffee. Every sip represents the authenticity and commitment of our creation."
        },
        {
            count: 320,
            title: 'Authentic Dishes',
            desc: "We take pride in providing scrumptious dishes to satisfy customers’ taste buds. From exotic French cuisines to classic Indian items, you will get everything under one roof. Savor the best items with a cup of coffee to have a delightful evening."
        },
        {
            count: 320,
            title: 'A Sustainable Inspiration',
            desc: "Being the best cafe Panchkula, Copper & Crumb is connected with the local community. Our team directly works with farmers, promoting sustainability and maintaining the authentic flavor. We have a special apprenticeship program to encourage women in culinary arts."
        },
    ]
    return (
        <Fragment>
            <Head>
                <title>Relax & Recharge With The Best Cafe Panchkula</title>
                <meta name='desription' content={`Looking for a place for your next coffee date? Panchkula has a hidden gem. Copper & Crumb is a well-known cafe in Panchkula and popular among coffee lovers for having an Indo-French fusion.`} />
            </Head>
            <CommonBanner title={"Best coffee in panchkula"} />
            {/* <section className="blog-section common-bg-1">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className="full-width-image">
                                <img src={blogImage.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>A Cafe With Indo-French Culinary Revolution</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    When classic French techniques meet Indian inspiration, they create something magical. Copper & Crumb is the best one when it comes to the best Indo-French cafe in Panchkula. Our culinary experts are crafting something revolutionary to give you the next-level experience. At Copper & Crumb, you can savor the unique taste of coffee crafted by using antique copper pots and modern-day espresso machines. The enchanting aroma of freshly brewed coffee will make your moments more special.
                                </p>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section> */}
            <section>
                <div className="container mt-sm-0 pt-0">
                    <Row gutter={[20, 20]} justify={'center'}>
                        <Col span={24} lg={16} xl={14} xxl={12} className='text-center'>
                            <div className='mb-4 pb-2'><img src={aboutBanner.src} alt="error" /></div>
                            <h4 className="title mb-4">
                                Copper & Crumb
                            </h4>
                            <h6 className="fw-semibold fs-4 mb-4">
                            A Cafe With Indo-French Culinary Revolution
                            </h6>
                            <p className="sub-title">
                            When classic French techniques meet Indian inspiration, they create something magical. Copper & Crumb is the best one when it comes to the best Indo-French cafe in Panchkula. Our culinary experts are crafting something revolutionary to give you the next-level experience. At Copper & Crumb, you can savor the unique taste of coffee crafted by using antique copper pots and modern-day espresso machines. The enchanting aroma of freshly brewed coffee will make your moments more special.
                            </p>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="blog-section common-bg-2">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col span={24} md={12} sm={24}>
                            <div className="full-width-image">
                                <img src={blog3.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>Copper & Crumb Story</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    Copper & Crumb tells the story of two inspiring souls to blend French techniques with authentic Indian culinary. This small cafe in Panchkula is the brainchild of Kannupriya and Utkarsh. They met at a school get-together and shared a passion for crafting something revolutionary. Copper & Crumb is more than a simple café; here every recipe is crafted with love.
                                </p>
                            </div>
                        </Col>
                        <Col span={24} md={12} sm={24}>
                            <div className="full-width-image">
                                <img src={blog2.src} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>Our Vision</h4>
                                <p className="mt-2 mb-3 text-dark">
                                    We have a dream of nurturing Indo-French culinary fusion while maintaining sustainability. Copper & Crumb is on a mission of crafting something more significant than a normal cafe. We have a vision of connecting people through culinary arts. Our team balances authenticity with modernity while maintaining the raw flavor.
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
                            <h2 className="title">Signature Creations
                            </h2>
                            <img src={titleSeperator.src} alt="error" className="title-seperator" />

                        </Col>
                    </Row>
                    <Row gutter={[14, 14]} justify={'center'}>
                        {stateData.map((res: any) => <Col key={res} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
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
                                    <h4 className="title mb-3">What Customers Say!</h4>
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
BestInPanchkula.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export default BestInPanchkula