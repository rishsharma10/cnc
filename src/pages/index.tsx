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
import HeroBanner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg'
import logo from '@/assets/brand-guide/logo.png'
import seperator from '@/assets/brand-guide/slider-separator-img.png'
import titleSeperator from '@/assets/brand-guide/title-separator.png'
import offerItem from '@/assets/brand-guide/h2-custom-icon-5.png'
import blogImage from '@/assets/images/retro-dishware-aroma-life-brown.jpg'
import serviceImage from '@/assets/images/delicious-coffee-cup-table.jpg'
import coffeeLogo from '@/assets/brand-guide/coffee-logo.png'
import brandImage from '@/assets/brand-guide/brand-1.png'
import Link from "next/link";
import { Carousel, Form, Grid } from "antd";
import CrumbIcons from "@/components/CrumbIcons";
import { ReactElement } from "react";
import CommonLayout from "@/components/common/CommonLayout";
import crumbApi from "@/utils/crumbApis";
import { stringReplace } from "@/utils/crumbValidation";
import ProductCard from "@/components/ProductCard";
const Home = () => {
  const itemData = [
    {
      image: offerItem,
      title: 'Types of Coffee',
      subTitle: 'Lorem ipsum dolor sit ametal, consectetuer adipiscing elitus. Aeneantos commodo',
    },
    {
      image: offerItem,
      title: 'Bean Varieties',
      subTitle: 'Lorem ipsum dolor sit ametal, consectetuer adipiscing elitus. Aeneantos commodo',
    },
    {
      image: offerItem,
      title: 'Coffee & Pastry',
      subTitle: 'Lorem ipsum dolor sit ametal, consectetuer adipiscing elitus. Aeneantos commodo',
    },
    {
      image: offerItem,
      title: 'Coffee To Go',
      subTitle: 'Lorem ipsum dolor sit ametal, consectetuer adipiscing elitus. Aeneantos commodo',
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

  return (
    <>

      {/* ------------------------- Hero Section ------------------------- */}
      <section className="hero-section py-0 ">
        <div className="container-fluid h-100">
          <Row gutter={[24, 24]} className="h-100">
            <Col span={24} className="h-100 px-0">
              <Carousel arrows={true} dots={false} autoplay={true}>
                {[...Array(3)].map(() => <div className="position-relative">
                  <div className="hero-banner h-100">
                    <div className="hero-image h-100">
                      {/* <img src={HeroBanner.src} alt="error" className="img-fluid" /> */}
                      <video className="img-fluid" controls={false} autoPlay={true} preload='preload' poster={HeroBanner.src}>
                        <source src="/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="hero-content position-absolute top-0 start-0 h-100 w-100 text-center d-flex flex-column align-items-center justify-content-center">
                      <Row justify={"center"}>
                        <Col span={24} lg={14} xl={14}>
                          <div className="hero-logo mb-3">
                            <img src={logo.src} alt="error" height={screens.sm ? 150 : 100} width={screens.sm ? 140 : 90} className="mx-auto" />
                          </div>
                          <h1>Coffee Heaven</h1>
                          <img src={seperator.src} alt="error" className="mt-3 mb-4 mx-auto" />
                          <p className="mb-4 mb-sm-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse maxime ex, tenetur dignissimos ullam aliquid quam assumenda aspernatur tempore deleniti est ad sequi, accusantium, nihil quia architecto molestias? Fugiat, praesentium.</p>
                          <span>
                            <Button size="large" type="primary" ghost className="rounded-0 border border-light text-uppercase py-3 h-auto px-5">Shop Here</Button>
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
              <h2 className="title">Our Delicious Offer</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </Col>
          </Row>
          <Row gutter={[14, 14]} justify={'center'}>
            {itemData.map((res: any) => <Col key={res} span={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <div className="offered-items-container text-center h-100 p-4">
                <div className="item-image">
                  <img src={res.image.src} alt="error" />
                </div>
                <h4 className="mt-3 mb-3">{res.title}</h4>
                <p className="text-secondary">{res.subTitle}</p>
              </div>
            </Col>)}
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
              <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
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
      <section className="stats-section">
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
      </section>

      <section className="blog-section common-bg">
        <div className="container">
          <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">The Coffee Herald</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            {[...Array(3)].map(() => <Col span={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <div className="blog-card">
                <div className="blog-image">
                  <img src={blogImage.src} alt="error" className="img-fluid" />
                </div>
                <div className="blog-content mt-4">
                  <h4>Prep Techniques</h4>
                  <p className="mt-3 mb-3 text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio et explicabo, expedita debitis.</p>
                  <Link href={'#'}>Read More</Link>
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
              <p className="sub-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
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
      <section className="beand-section">
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
      </section>

      {/* ---------------------------- contact-section ---------------- */}
      <section className="contact-section common-bg">
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="contact-text d-flex gap-4 align-items-center justify-content-center justify-content-sm-between text-center text-sm-start flex-wrap">
                <h4 className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</h4>
                <Link href={`/contact`}><Button type="primary" className="shadow-none h-auto">Contact us</Button></Link>
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
