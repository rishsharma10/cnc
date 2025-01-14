import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  FormItem,
  Input,
  Modal,
  Row,
  Space,
  TypographyText,
  TypographyTitle,
  Upload,
} from "@/lib/AntRegistry";
import React, { useContext, useState } from 'react'
import logo from '@/assets/brand-guide/logo.png'
import seperator from '@/assets/brand-guide/slider-separator-img.png'
import HeroBanner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg'
import titleSeperator from '@/assets/brand-guide/title-separator.png'
import serviceImage from '@/assets/images/delicious-coffee-cup-table.jpg'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import offerItem from '@/assets/brand-guide/h2-custom-icon-5.png'
import coffeeLogo from '@/assets/brand-guide/coffee-logo.png'
import pastryimg from '@/assets/images/layered-fruit-cake-cake-with-strawberries-raspberry-sauce-cream-stone-background-patisserie-desserts.jpg'
import side_view_man from '@/assets/images/side-view-man-preparing-food.jpg'
import hand_holding from '@/assets/images/hand-holding-spoon-pouring-coffee-powder-grinder-grinding-coffee-pouring-into-portafilter.jpg'
import person_serving from '@/assets/images/person-serving-cup-coffee.jpg'
import Link from "next/link";
import { Carousel, Form, Grid } from "antd";
import CrumbIcons from "@/components/CrumbIcons";
import { ReactElement } from "react";
import CommonLayout from "@/components/common/CommonLayout";
import crumbApi from "@/utils/crumbApis";
// import video1 from "@/assets/videos/cori"
import { stringReplace } from "@/utils/crumbValidation";
import ProductCard from "@/components/ProductCard";
const Home = () => {
  const itemData = [
    {
      image: pastryimg.src,
      title: `Pastry Program
      `,
      subTitle: `Each creation tells a story of tradition reimagined. Our viennoiserie marries French technique
      with Indian inspiration, while our entremets explore bold new flavor territories. Try our signature
      pecan-coffee entremet, where house-roasted beans meet mascarpone mousse and tonka bean
      in perfect harmony.`,
    },
    {
      image: person_serving.src,
      title: `Coffee Program
      `,
      subTitle: `In partnership with Beanrove Coffee Roasters, we bring you ethically sourced beans roasted to
      perfection. Every cup represents our commitment to sustainability and fair trade, delivering an
      adventure in every sip`,
    },
    {
      image: blogImage.src,
      title: `Community & Sustainability`,
      subTitle: `Our roots run deep in the local community. We work directly with farmers to source heritage
      wheat varieties and seasonal fruits, ensuring both exceptional flavor and sustainable practices.
      Our apprenticeship program focuses on empowering women in culinary arts, turning passion
      into profession.
      `,
    },
    // {
    //   image: offerItem.src,
    //   title: 'Coffee To Go',
    //   subTitle: 'Lorem ipsum dolor sit ametal, consectetuer adipiscing elitus. Aeneantos commodo',
    // },
  ]
  const serviceArray = [
    {
      image: offerItem.src,
      title: 'Signature Coffee Blends',
      subTitle: 'Handpicked beans, expertly brewed to bring you the perfect cup every time.',
    },
    {
      image: offerItem.src,
      title: 'Freshly Baked Pastries',
      subTitle: 'Indulge in our range of delicious, oven-fresh pastries and snacks that pair perfectly with any coffee.',
    },
    {
      image: offerItem.src,
      title: 'Limited-Edition Flavors',
      subTitle: 'From seasonal blends to innovative creations, enjoy unique flavors that you won’t find anywhere else.',
    },
    {
      image: offerItem.src,
      title: 'Specialty Drinks',
      subTitle: 'Explore our range of crafted drinks, from classic lattes to unique iced beverages that refresh and delight.',
    },
  ]
  const stateData = [
    {
      count: 250,
      title: 'Varieties of Coffee',
    },
    {
      count: 126,
      title: 'Hours of Testing',
    },
    {
      count: 320,
      title: 'Coffee Markets',
    },
    {
      count: 220,
      title: 'Coffee Brands',
    },
  ]
  const [state, setState] = useState({ data: [], count: 0 })


  const initProductList = async () => {
    try {
      let apiRes = await crumbApi.Product.list()
      setState(apiRes)
    } catch (error) {

    }
  }
  console.log(state, 'statetttt');

  React.useEffect(() => {
    initProductList()
  }, [])

  const screens = Grid.useBreakpoint()

  const responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
  const bannerArray = [
    {
      title: `The Quiet Zone
      `,
      desc: `Find your sanctuary away from the world. A single traveler's paradise where you can savor a
      perfectly crafted cappuccino alongside our signature entremet.`,
      button: `Explore Our Menu`,
      link: `/products/search/1/1`,
      poster: HeroBanner.src,
      video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    },
    {
      title: `The Social Hub`,
      desc: `Where stories unfold over perfectly laminated croissants and friendships deepen over
      house-roasted coffee. Gather at tables crafted by local artisans, where every meal becomes a
      memory.
      `,
      button: `Explore Our Menu`,
      link: `/products/search/1/1`,
      poster: blogImage.src,
      video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    },
    {
      title: `The Exhibition Kitchen`,
      desc: `Watch art come to life as our pastry team transforms simple ingredients into extraordinary
      creations. From morning lamination to afternoon chocolate work, witness the magic of craft in
      motion.
      `,
      button: `Explore Our Menu`,
      link: `/products/search/1/1`,
      poster: serviceImage.src,
      video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    }
  ]

  return (
    <>

      {/* ------------------------- Hero Section ------------------------- */}
      <section className="hero-section py-0 ">
        <div className="container-fluid h-100">
          <Row gutter={[24, 24]} className="h-100">
            <Col span={24} className="h-100 px-0">
              <Carousel arrows={true} dots={false} autoplay={false}>
                {bannerArray.map((res, index) => <div key={index} className="position-relative">
                  <div className="hero-banner h-100">
                    <div className="hero-image h-100">
                      {/* <img src={HeroBanner.src} alt="error" className="img-fluid" /> */}
                      <video className="img-fluid" controls={false} autoPlay={true} preload='preload' poster={res.poster}>
                        <source src={res.video} type="video/mp4" />
                      </video>
                    </div>
                    <div className="hero-content position-absolute top-0 start-0 h-100 w-100 text-center d-flex flex-column align-items-center justify-content-center">
                      <Row justify={"center"}>
                        <Col span={24} lg={14} xl={14}>
                          <div className="hero-logo mb-3">
                            <img src={logo.src} alt="error" height={screens.sm ? 150 : 100} width={screens.sm ? 140 : 90} className="mx-auto" />
                          </div>
                          <h1>{res.title}
                          </h1>
                          <img src={seperator.src} alt="error" className="mt-3 mb-4 mx-auto" />
                          <p className="mb-4 mb-sm-5">{res.desc}
                          </p>
                          <span>
                            <Link href={res.link}><Button size="large" type="primary" ghost className="rounded-0 border border-light text-uppercase py-3 h-auto px-5">{res.button}</Button></Link>
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>)}
              </Carousel>
            </Col>
          </Row>
        </div>
      </section>







      {/* ------------------------- Offer Section ------------------------ */}
      <section className="offer-section">
        <div className="container">
          <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={16} xl={14} className="text-center">
              <h2 className="title">Our Delicious Offer
              </h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">At Copper & Crumb, we’re all about bringing you the finest coffee and delightful treats that perfectly complement your coffee experience. Whether you're craving a smooth espresso, a rich pour-over, or a freshly baked pastry, our menu has something for everyone.</p>
            </Col>
          </Row>
          <Row gutter={[14, 14]} justify={'center'}>
            {serviceArray.map((res: any) => <Col key={res} span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <div className="offered-items-container text-center h-100 p-4">
                <div className="item-image">
                  <img src={res.image} alt="error" />
                </div>
                <h4 className="mt-3 mb-3">{res.title}</h4>
                <p className="text-secondary">{res.subTitle}</p>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>
      <section className="contact-us pt-0 bg-white">
        <div className="container mt-sm-5 pt-5">
          <Row gutter={[20, 20]} justify={'space-between'}>
                <Col span={24} lg={7} xl={7} xxl={7}>
                  <TypographyTitle className="text-uppercase" level={4}>Building Dreams One Layer at a Time
                  </TypographyTitle>
                  <p className='fs-16'>Where French technique meets Indian heart, crafting tomorrow's classics today.
                    In our sunlit corner of Panchkula, a culinary revolution is taking shape. Here, antique copper
                    pots share space with gleaming espresso machines, while the aroma of Kerala vanilla beans
                    mingles with French butter. At Copper & Crumb, we're not just making pastries – we're crafting
                    experiences that bridge continents and generations.</p>
                  <Link href={`/products/search/1/1`} ><Button className="mt-3" type="primary" ghost>Reserve Your Experience</Button></Link>
              
                </Col>
                <Col  span={24} lg={16} xl={16} xxl={16}>
                <div className="about-banner mb-3">
                  <img src={side_view_man.src} alt="error" className='img-fluid' />
                </div>
                </Col>
          </Row>
        </div>
      </section>
      <section className="contact-us pt-0 bg-white">
        <div className="container">
          <Row gutter={[20, 20]} justify={'space-between'}>
          <Col  span={24} lg={16} xl={16} xxl={16}>
                <div className="about-banner mb-3">
                  <img src={hand_holding.src} alt="error" className='img-fluid' />
                </div>
                </Col>
                <Col span={24} lg={7} xl={7} xxl={7}>
                  <TypographyTitle className="text-uppercase" level={4}>Our Story Snapshot
                  </TypographyTitle>
                  <p className='fs-16'>From quiet kitchen experiments during motherhood to the bustling heart of Panchkula's culinary
                    scene, Copper & Crumb represents the vision of two women who dared to dream differently.
                    Here, antique copper pots share space with modern espresso machines, while Kerala vanilla
                    beans infuse the air alongside French butter.</p>
                  <Link href={`/our-story`} ><Button className="mt-3" type="primary" ghost>Discover Our Journey</Button></Link>
                </Col>
                
                
          </Row>
        </div>
      </section>
      {/* ------------------------- Cart Section ------------------------ */}
      <section className="cart-section common-bg">
        <div className="container">
          <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">Online Coffee Shop</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">Experience the finest coffee from the comfort of your home. From signature blends to fresh brews, our online shop brings the Copper & Crumb experience straight to your door. Sip, savor, and enjoy!</p>
            </Col>
          </Row>
          <Row gutter={[20, 20]} justify={'center'}>
            {Array.isArray(state?.data) && state?.data.map((res: any, index: number) => <ProductCard key={index} {...res} />)}
          </Row>
        </div>
      </section>
      {/* ------------------------- Blog Section ------------------------ */}


      {/* --------------------- Fixed Banner Section ---------------------- */}
      <section className="fixed-banner-section">
        <div className="container h-100">
          <Row className="h-100" align={"middle"}>
            <Col span={24}>
              <div className="logo text-center">
                <img src={coffeeLogo.src} alt="error" />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* ---------------------- Stats Section --------------------------- */}
      {/* <section className="stats-section">
        <div className="container">
          <Row gutter={[22, 20]}>
            {stateData.map((res: any) => <Col key={res} span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <div className="stats-card text-center">
                <h1>{res.count}</h1>
                <h4 className="mt-4 mb-2">{res.title}</h4>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean</p>
              </div>
            </Col>)}
          </Row>
        </div>
      </section> */}

      <section className="blog-section common-bg">
        <div className="container">
          <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">Signature Creations
              </h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">At Copper & Crumb, we craft unique coffee experiences with our Signature Creations. Each cup is a masterpiece, made with quality ingredients and a dash of creativity to delight your senses.</p>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            {itemData.map((res, index) => <Col key={index} span={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <div className="blog-card">
                <div className="blog-image">
                  <img src={res.image} alt="error" className="img-fluid" />
                </div>
                <div className="blog-content mt-4">
                  <h4>{res.title}</h4>
                  <p className="mt-3 mb-3 text-secondary">{res.subTitle}</p>
                  {/* <Link href={'#'}>Read More</Link> */}
                </div>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>

      {/* /-------------------------- Gallery section ------------------ */}
      <section className="gallery-section pb-0">
        <div className="container-fluid px-0">
          <Row justify={"center"} className="mb-5 mx-0">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">Our Sweet Gallery</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">Treat yourself to our hand-crafted desserts and freshly baked pastries. The perfect sweet companion to your favorite brew, crafted to delight every time</p>
            </Col>
          </Row>
          <Row gutter={[20, 20]} className="mx-0">
            {[...Array(8)].map(() => <Col span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <div className="gallery-card">
                <div className="gallery-image">
                  <img src={serviceImage.src} alt="error" className="img-fluid" style={{ objectPosition: 'left' }} />
                </div>
                <div className="gallery-content">
                  <h4>Brewed</h4>
                  <p>Cup of coffee/Filtered</p>
                </div>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>

      {/* ---------------------------- Brand Section ------------------- */}
      {/* <section className="beand-section">
        <div className="container-fluid">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Carousel dots={false} autoplay slidesToShow={5} slidesToScroll={1} draggable={true} responsive={responsive}>
                {[...Array(6)].map(() => <div className="brand-image">
                  <img src={brandImage.src} alt="error" />
                </div>)}
              </Carousel>
            </Col>
          </Row>
        </div>
      </section> */}

      {/* ---------------------------- contact-section ---------------- */}
      <section className="contact-section common-bg">
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="contact-text d-flex gap-4 align-items-center justify-content-center justify-content-sm-between text-center text-sm-start flex-wrap">
                <h4 className="m-0">We’d love to hear from you! Reach out with any questions or feedback. Let’s connect!</h4>
                <Link href={`/pages/contact-us`}><Button type="primary" className="shadow-none h-auto">Contact us</Button></Link>
              </div>
            </Col>
          </Row>
        </div>
      </section>


    </>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default Home;
