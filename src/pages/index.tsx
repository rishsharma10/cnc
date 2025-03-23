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
      title: 'The Quiet Zone',
      subTitle: `Find your sanctuary away from the world. A single traveler's paradise where you can savor a 
perfectly crafted cappuccino alongside our signature entremet.`,
    },
    {
      image: offerItem.src,
      title: 'The Social Hub ',
      subTitle: `Where stories unfold over perfectly laminated croissants and friendships deepen over 
house-roasted coffee. Gather at tables crafted by local artisans, where every meal becomes a 
memory. `,
    },
    {
      image: offerItem.src,
      title: 'The Exhibition Kitchen ',
      subTitle: `Watch art come to life as our pastry team transforms simple ingredients into extraordinary 
creations. From morning lamination to afternoon chocolate work, witness the magic of craft in 
motion. `,
    }
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
  const [popularProducts, setPopularProducts] = useState({ products: [], count: 0 })


  const initProductList = async () => {
    try {
      let apiRes = await crumbApi.Product.list()
      setState(apiRes)
    } catch (error) {

    }
  }
  const initProductListBestSelling = async () => {
    try {
      let apiRes = await crumbApi.Product.popular()
      setPopularProducts(apiRes)
    } catch (error) {

    }
  }
  console.log(state, 'statetttt');

  React.useEffect(() => {
    initProductList()
    initProductListBestSelling()
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
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  const bannerArray = [
    {
      title: `Pastry Poetry. Coffee Canvas.`,
      desc: `Where French technique meets Indian heart, crafting tomorrow's classics today.
                  In our sunlit corner of Panchkula, a culinary revolution is taking shape. Here, antique copper
                  pots share space with gleaming espresso machines, while the aroma of Kerala vanilla beans
                  mingles with French butter. At Copper & Crumb, we're not just making pastries – we're crafting
                  experiences that bridge continents and generations.`,
      button: `Explore Our Menu`,
      link: `/products/search/all/1`,
      poster: HeroBanner.src,
      video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    },
    // {
    //   title: `Pastry Poetry. Coffee Canvas.`,
    //   desc: `Where French technique meets Indian heart, crafting tomorrow's classics today.
    //               In our sunlit corner of Panchkula, a culinary revolution is taking shape. Here, antique copper
    //               pots share space with gleaming espresso machines, while the aroma of Kerala vanilla beans
    //               mingles with French butter. At Copper & Crumb, we're not just making pastries – we're crafting
    //               experiences that bridge continents and generations.
    //   `,
    //   button: `Explore Our Menu`,
    //   link: `/products/search/1/1`,
    //   poster: blogImage.src,
    //   video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    // },
    // {
    //   title: `The Exhibition Kitchen`,
    //   desc: `Watch art come to life as our pastry team transforms simple ingredients into extraordinary
    //   creations. From morning lamination to afternoon chocolate work, witness the magic of craft in
    //   motion.
    //   `,
    //   button: `Explore Our Menu`,
    //   link: `/products/search/1/1`,
    //   poster: serviceImage.src,
    //   video: '/public/prelaunch-teaser-campaign-of-cafe-patisserie-copper.mp4'
    // }
  ]
  let screenSize = screens.xxl ? 5 :screens.xl ? 4 :screens.lg ? 3 : screens.md ? 2 : screens.sm ? 1 : 1

  return (
    <>

      {/* ------------------------- Hero Section ------------------------- */}
      <section className="hero-section py-0 ">
        <div className="container-fluid h-100">
          <Row gutter={[24, 24]} className="h-100">
            <Col span={24} className="h-100 px-0">
              <Carousel arrows={false} dots={false} autoplay={false}>
                {bannerArray.map((res, index) => <div key={index} className="position-relative">
                  <div className="hero-banner h-100">
                    <div className="hero-image h-100">
                      {/* <img src={HeroBanner.src} alt="error" className="img-fluid" /> */}
                      <video className="img-fluid" controls={false} loop muted autoPlay={true} >
                        <source src={'https://videos.pexels.com/video-files/4819598/4819598-sd_506_960_25fps.mp4'} type="video/mp4" />
                      </video>
                    </div>
                    <div className="hero-content position-absolute top-0 start-0 h-100 w-100 text-center d-flex flex-column align-items-center justify-content-center">
                      <Row justify={"center"}>
                        <Col span={24} lg={20} xl={16} xxl={14}>
                          {/* <div className="hero-logo mb-3">
                            <img src={logo.src} alt="error" height={screens.sm ? 150 : 100} width={screens.sm ? 140 : 90} className="mx-auto" />
                          </div> */}
                          <h1>{res.title}
                          </h1>
                          <img src={seperator.src} alt="error" className="mt-3 mb-4 mx-auto" />
                          <p className="mb-4 mb-sm-5">{res.desc}
                          </p>
                          {/* <span>
                            <Link href={res.link}><Button size="large" type="primary" ghost className="rounded-0 border border-light text-uppercase py-3 h-auto px-5">{res.button}</Button></Link>
                          </span> */}
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

      <section className="contact-us pt-0 bg-white">
        <div className="container pt-5">
          <Row gutter={[40, 40]} justify={'space-between'} align={"top"}>
            <Col span={24} lg={14} xl={14} xxl={14}>
              <div className="story-section">
                <img src={hand_holding.src} alt="error" className='img-fluid' />
              </div>
            </Col>
            <Col span={24} lg={9} xl={9} xxl={9}>
              <TypographyTitle className="text-uppercase" level={4}>Our Story Snapshot
              </TypographyTitle>
              <p className='fs-16 text-justify'>From quiet kitchen experiments during motherhood to the bustling heart of Panchkula's culinary
                scene, Copper & Crumb represents the vision of two women who dared to dream differently.
                Here, antique copper pots share space with modern espresso machines, while Kerala vanilla
                beans infuse the air alongside French butter.</p>
              <Link href={`/our-story`} ><Button className="mt-3" type="primary" ghost>Discover Our Journey</Button></Link>
            </Col>
          </Row>
        </div>
      </section>

      <section className="blog-section common-bg-2">
        <div className="container">
          <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">Signature Creations
              </h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              {/* <p className="sub-title">At Copper & Crumb, we craft unique coffee experiences with our Signature Creations. Each cup is a masterpiece, made with quality ingredients and a dash of creativity to delight your senses.</p> */}
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
                  <p className="mt-3 mb-3 text-justify">{res.subTitle}</p>
                  {/* <Link href={'#'}>Read More</Link> */}
                </div>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>
     
      <section className="gallery-section ">
        <div className="container-fluid px-0">
          <Row justify={"center"} className="mb-5 mx-0">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">Featured Products</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
            </Col>
          </Row>
          <Row gutter={[20, 20]} className="mx-0">
            <Col span={24}>
              <Carousel dots={false} autoplay slidesToShow={screenSize} infinite={true} slidesToScroll={1} draggable={true} responsive={responsive}>
                {Array.isArray(state?.data) && state?.data.map((res: any, index: number) => <ProductCard slider key={index} {...res} />)}
              </Carousel>

            </Col>
          </Row>
        </div>
      </section> 
      <section className="offer-section common-bg-2">
        <div className="container">
          <Row justify={"center"} className="mb-5">
            <Col span={24} md={20} lg={16} xl={14} className="text-center">
              <h2 className="title">Our Spaces
              </h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
              {/* <p className="sub-title">At Copper & Crumb, we’re all about bringing you the finest coffee and delightful treats that perfectly complement your coffee experience. Whether you're craving a smooth espresso, a rich pour-over, or a freshly baked pastry, our menu has something for everyone.</p> */}
            </Col>
          </Row>
          <Row gutter={[14, 14]} justify={'center'}>
            {serviceArray.map((res: any) => <Col key={res} span={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <div className="offered-items-container text-center h-100 p-4">
                <div className="item-image">
                  <img src={res.image} alt="error" />
                </div>
                <h4 className="mt-3 mb-3">{res.title}</h4>
                <p className="text-dark ">{res.subTitle}</p>
              </div>
            </Col>)}
          </Row>
        </div>
      </section>
      {/* --------------------- Fixed Banner Section ---------------------- */}
      <section className="fixed-banner-section">
        <div className="container h-100">
          <Row className="h-100" align={"middle"}>
            <Col span={24}>
              <div className="logo text-center">
                <img src={logo.src} alt="error" height={220} width={200} />
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

      {/* /-------------------------- Gallery section ------------------ */}
       <section className="gallery-section">
        <div className="container-fluid px-0">
          <Row justify={"center"} className="mb-5 mx-0">
            <Col span={24} md={20} lg={14} xl={12} className="text-center">
              <h2 className="title">Best sellers</h2>
              <img src={titleSeperator.src} alt="error" className="title-seperator" />
            </Col>
          </Row>
          <Row gutter={[20, 20]} className="mx-0">
            <Col span={24}>
              <Carousel dots={false} autoplay slidesToShow={screenSize} infinite={true} slidesToScroll={1} draggable={true} responsive={responsive}>
                {Array.isArray(popularProducts?.products) && popularProducts?.products.map((res: any, index: number) => <ProductCard slider key={index} {...res} />)}
              </Carousel>

            </Col>
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
      <section className="contact-section pt-0 mt-5">
        <div className="container cta-section">
          <Row justify={"center"}>
            <Col span={24} lg={18} xl={16} xxl={14}>
              <div className="contact-text text-center p-sm-4">
                <h3 className="mb-4">We’d love to hear from you! Reach out with any questions or feedback. Let’s connect!</h3>
                <Link href={`/pages/contact-us`}>
                  <Button size="large" type="primary" ghost className="rounded-0 border border-light text-uppercase py-3 h-auto px-5">Contact us</Button>
                </Link>
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
