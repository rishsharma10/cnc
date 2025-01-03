
import CommonLayout from '@/components/common/CommonLayout'
import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Checkbox, Col, Dropdown, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs, TextArea } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import productImage from '@/assets/brand-guide/product-img-5.png'
import banner from '@/assets/brand-guide/bg-image.png'
import Link from 'next/link'
import { MenuProps, TabsProps } from 'antd'
const ProductDetails = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Description',
      children: <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>,
    },
    {
      key: '2',
      label: 'Additional information',
      children: <ul className='list-unstyled p-0'>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Weight</span>: <span className='text-secondary'>1 kg</span></li>
        <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Dimensions</span>: <span className='text-secondary'>20 × 10 × 30 cm</span></li>
      </ul>,
    },
    {
      key: '3',
      label: 'Review (1)',
      children: <div className='product-review'>
        <h4>1 review for Kenya Coffee</h4>
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

  return (
    <section className='product-list-section pt-0 bg-white'>
      <CommonBanner title={"PRoduct List"} />
      <div className="container mt-5 pt-5">
        <Row gutter={[24, 24]} justify={'space-between'}>
          <Col span={24} lg={11} xl={12} xxl={12}>
            <div className="product-images">
              <div className="preview-image mb-4">
                <img src={productImage.src} alt="error" className='h-100 w-100' />
              </div>
              <div className="preview-image-list">
                {[...Array(6)].map((index) => <div key={index} className="list-image">
                  <img src={productImage.src} alt="error" className='h-100 ' />
                </div>)}
              </div>
            </div>
          </Col>
          <Col span={24} lg={11} xl={11} xxl={11}>
            <div className="product-details">
              <h4 className="title fs-1">
                kenya coffee
              </h4>
              <p className='fs-5'>$18.00</p>

              <Flex className='rate mb-4' gap={6}><Rate className='fs-5' value={3} />
                <span className='text-secondary'>(1 customer review)</span></Flex>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi a itaque repellendus voluptatem facilis magnam maxime dolorem fuga asperiores soluta totam placeat perferendis ad similique eligendi dicta, libero vel rem!</p>

              <Flex align='center' gap={20} className='my-5'>
                <Flex className='quantity-counter'><Flex className='p-3 counter-div'>2</Flex><Flex className='flex-column h-100'><Button>+</Button><Button>-</Button></Flex></Flex>
                <Link href={'/viewcart'}><Button type='primary' size='large' className='px-5'>add to cart</Button></Link>
              </Flex>

              <ul className='list-unstyled p-0'>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>SKU</span>: <span className='text-secondary'>PR111-2</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Category</span>: <span className='text-secondary'>Fresh Coffee</span></li>
                <li className='product-desc-list mb-2 pb-1'><span className='fw-semibold text-uppercase'>Tags</span>: <span className='text-secondary'>Black, Casual, Classic</span></li>
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
        <Row gutter={[20, 20]} className='mt-5'>
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
        </Row>
      </div>
    </section>
  )
}

ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default ProductDetails


