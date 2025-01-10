
import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Checkbox, Col, Dropdown, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs, TextArea } from '@/lib/AntRegistry'
import React, { ReactElement,useState } from 'react'
import productImage from '@/assets/brand-guide/product-img-5.png'
import banner from '@/assets/brand-guide/bg-image.png'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { MenuProps, TabsProps } from 'antd'
import crumbApi, { BUCKET_ROOT } from '@/utils/crumbApis'
import { ProductDetails } from '@/interface/product/ProductDetails'
import { stringReplace } from '@/utils/crumbValidation'
const ProductDetail = (props:ProductDetails) => {
  console.log(props,'propsspsppsp');
 const [state, setState] = useState(props as ProductDetails)
  

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p>{state?.desc}</p>,
    },
    {
      key: '2',
      label: 'Additional information',
      children: <ul className='list-unstyled p-0'>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Weight</span>: <span className='text-secondary'>{state?.weight ?? 0} kg</span></li>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Dimensions</span>: <span className='text-secondary'>{`${state?.dimension_d ?? 0} × ${state?.dimension_l ?? 0} × ${state?.dimension_w ?? 0} cm`}</span></li>
      </ul>,
    },
    {
      key: '3',
      label: 'Review (1)',
      children: <div className='product-review'>
        <h4>1 review for {state.name}</h4>
        {/* review card */}
        <Flex className="review-user-card my-4" gap={12}>
          <Avatar src={banner.src} size={60} style={{ minWidth: 60 }} />
          <div className="content">
            <Rate value={4} className='fs-6' />
            <Flex align='center' className='my-1' gap={6}>
              <span className='fw-medium'>Janet Hopkins</span>
              -
              <span>18/04/2018</span>
            </Flex>
            <p className='m-0'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
          </div>
        </Flex>

        {/* review form */}
        <div className="review-form">
          <p className='mb-1'>Add a review</p>
          <p className='mb-1'>Your email address will not be published. Required fields are marked *</p>
          <p className='mb-1'>Your rating *</p>
          <Rate value={3} className='fs-6' />

          <AntForm layout='vertical' size='large'>
            <FormItem label="Your review *">
              <TextArea rows={6}/>
            </FormItem>
            <FormItem label="Name *">
              <Input/>
            </FormItem>
            <FormItem label="Email *">
              <Input/>
            </FormItem>

            <Checkbox>Save my name, email, and website in this browser for the next time I comment.</Checkbox>

            <Button type='primary' className='px-5 mt-2'>Submit</Button>
          </AntForm>
        </div>
      </div>,
    },
  ];

  const [relatedProduct, setRelatedProduct] = useState({data:[],count:0})


  const initProductList  = async () => {
    try {
      let apiRes = await crumbApi.Product.list()
      setRelatedProduct(apiRes)
    } catch (error) {
      
    }
  }
  console.log(state,'statetttt');
  
React.useEffect(() => {
  initProductList()
},[])

  return (
    <section className='product-list-section pt-0 bg-white'>
      <CommonBanner title={"PRoduct Details"} image={state?.thumb_url} />
      <div className="container mt-5 pt-5">
        <Row gutter={[24, 24]} justify={'space-between'}>
          <Col span={24} lg={11} xl={12} xxl={12}>
            <div className="product-images">
              <div className="preview-image mb-4">
                <img src={state?.thumb_url ?? productImage.src} alt="error" className='h-100 w-100' />
              </div>
              <div className="preview-image-list">
                {[state.image_1,state.image_2].map((res,index) => <div key={index} className="list-image">
                  <img src={res ? `${BUCKET_ROOT}${res}`: productImage.src} alt="error" className='h-100 ' />
                </div>)}
              </div>
            </div>
          </Col>
          <Col span={24} lg={11} xl={11} xxl={11}>
            <div className="product-details">
              <h4 className="title fs-1">
                {state.name}
              </h4>
              <p className='fs-5'>${Number(state.price).toFixed(2)}</p>

              <Flex className='rate mb-4' gap={6}><Rate className='fs-5' value={3} />
                <span className='text-secondary'>(1 customer review)</span></Flex>

              <p>{state?.notes}</p>

              <Flex align='center' gap={20} className='my-5'>
                <Flex className='quantity-counter'><Flex className='p-3 counter-div'>2</Flex><Flex className='flex-column h-100'><Button>+</Button><Button>-</Button></Flex></Flex>
                <Link href={'/viewcart'}><Button type='primary' size='large' className='px-5'>add to cart</Button></Link>
              </Flex>

              <ul className='list-unstyled p-0'>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>SKU</span>: <span className='text-secondary'>{state?.sku}</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Category</span>: <span className='text-secondary'>Fresh Coffee</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Tags</span>: <span className='text-secondary'>{`${state?.tag_1}, ${state?.tag_2}, ${state?.tag_3}`}</span></li>
                <li className='product-desc-list'><span className='fw-semibold text-uppercase'>Share</span>:
                  <ul className="list-unstyled m-0 p-0 d-flex align-items-center gap-4">
                    <li><Link href={'/'}><i className="fa-brands fa-facebook"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-square-instagram"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-twitter"></i></Link></li>
                    <li><Link href={'/'}><i className="fa-brands fa-linkedin"></i></Link></li>
                  </ul></li>
              </ul>

              <div className="product-details-tab mt-5">
                <Tabs defaultActiveKey="1" items={items} />
              </div>
            </div>
          </Col>
        </Row>
        {/* <Row gutter={[20, 20]} className='mt-5'>
          <Col span={24} className='mb-2'><h4 className='title fs-2'>Related products</h4></Col>
          {[...Array(4)].map(() => <Col span={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="cart-card">
              <div className="cart-image text-center">
                <img src={productImage.src} alt="error" />
                <div className="cart-overlay">
                  <Link href={'/product/name/id'}><Button type="primary" className="px-5 py-3 h-auto">Add To Cart</Button></Link>
                </div>
              </div>
              <div className="cart-content mt-4 text-center">
                <Link href={'#'}><h4>Kenya Coffee</h4></Link>
                <p className="text-secondary fs-6">$18.00</p>
              </div>
            </div>
          </Col>)}
        </Row> */}
            <Row gutter={[20, 20]} className='mt-5'>
            <Col span={24} className='mb-2'><h4 className='title fs-2'>Related products</h4></Col>
            {Array.isArray(relatedProduct?.data) && relatedProduct?.data.map((res:any,index:number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="cart-card">
                <div className="cart-image text-center">
                  <div className="product-image">
                  <img src={res?.thumb_url ?? productImage.src} alt="error" />

                  </div>
                  <div className="cart-overlay">
                    <Link href={`/product/${stringReplace(res.name)}/${res.id}`}><Button type="primary" className="px-5 py-3 h-auto">Add To Cart</Button></Link>
                  </div>
                </div>
                <div className="cart-content mt-4 text-center">
                  <Link href={`/product/${stringReplace(res.name)}/${res.id}`}><h4>{res?.name ?? 'N/A'}</h4></Link>
                  <p className="text-secondary fs-6">${Number(res?.price).toFixed(2)}</p>
                </div>
              </div>
            </Col>)}
          </Row>
      </div>
    </section>
  )
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiRes = await crumbApi.Product.details(String(context.query.id));
    return { props: apiRes.data[0] ? apiRes.data[0] :apiRes.data };
  } catch (error) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
};
export default ProductDetail


