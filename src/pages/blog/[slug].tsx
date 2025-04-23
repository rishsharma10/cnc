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
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import crumbApi from '@/utils/crumbApis';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const BlogDetails = (props:any) => {
    console.log(props,"propsss");
    
    const router = useRouter()
    const {slug,id}= router.query

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
    function formatToDDMMYYYY(dateString:string) {
        const date = new Date(dateString);
        const dd = String(date.getUTCDate()).padStart(2, '0');
        const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const yyyy = date.getUTCFullYear();
      
        return `${dd}-${mm}-${yyyy}`;
      }
    return (
        <Fragment>
            <Head>
                <title>{props?.title}</title>
                <meta name='desription' content={props?.description} />
            </Head>
            <CommonBanner title={props?.title} />
            <section className="blog-section common-bg-1">
                <div className="container">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className="full-width-image">
                                <img src={props?.banner_url} alt="error" className="img-fluid" />
                            </div>
                            <div className="blog-content mt-4">
                                <h4>{props?.title}</h4>
                                <div className="mt-2 mb-3 text-dark" dangerouslySetInnerHTML={{__html:props?.description}}>
                                   
                                </div>
                            </div>
                            <p className='fw-bold'>Last Updated:<span className='text-muted ms-2'>{formatToDDMMYYYY(props?.updated_at)}</span></p>
                        </Col>

                    </Row>
                </div>
            </section>
        </Fragment>
    )
}
BlogDetails.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiRes = await crumbApi.Blogs.getById(String(context.query.slug))
    return {
      props: { ...apiRes.data },

    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },

    }
  }
}
export default BlogDetails