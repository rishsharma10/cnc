import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Col, Dropdown, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import productImage from '@/assets/brand-guide/product-img-5.png'
import banner from '@/assets/brand-guide/bg-image.png'
import Link from 'next/link'
import CommonLayout from '@/components/common/CommonLayout'
const ProductList = () => {

  return (
    <section className='product-list-section pt-0 bg-white'>
      <CommonBanner title={"PRoduct List"} />
      <div className="container mt-5 pt-5">
        <Row gutter={[24, 24]} justify={'space-between'}>
          <Col span={24} lg={6} xl={6} xxl={6}>
            <div className='product-list-box'>
              <ul className='list-unstyled p-0 mb-5'>
                <h4>Product categories</h4>
                <li className='mb-2'><Link href={'#'}>Accessories</Link></li>
                <li className='mb-2'><Link href={'#'}>Bean Varieties</Link></li>
                <li className='mb-2'><Link href={'#'}>Coffee Cups</Link></li>
                <li className='mb-2'><Link href={'#'}>Espresso Machines</Link></li>
                <li className='mb-2'><Link href={'#'}>Fresh Coffee</Link></li>
                <li><Link href={'#'}>Italian Coffee</Link></li>
              </ul>

              <div className="product-tag">
                <h4 className='mb-3'>Product tags</h4>
                <ul className='list-unstyled p-0 mb-5 gap-2 d-flex align-items-center flex-wrap'>
                  <li><Link href={'#'}>Aroma</Link>,</li>
                  <li><Link href={'#'}>Beans</Link>,</li>
                  <li><Link href={'#'}>Black</Link>,</li>
                  <li><Link href={'#'}>Casual</Link>,</li>
                  <li><Link href={'#'}>Classic</Link>,</li>
                  <li><Link href={'#'}>Cream</Link>,</li>
                  <li><Link href={'#'}>Elegant</Link>,</li>
                  <li><Link href={'#'}>Fresh</Link>,</li>
                  <li><Link href={'#'}>Cream</Link></li>
                </ul>
              </div>

              <div className="top-rated-product">
                <h4 className='mb-3'>Top rated products</h4>
                <Link href={'/product/search/1'}>
                  <Flex align='center'>
                    <Avatar src={productImage.src} size={120} />
                    <div>
                      <p className='mb-1'>French press</p>
                      <Rate value={5} className='fs-6 my-2' />
                      <p className="m-0">
                        $23.00
                      </p>
                    </div>
                  </Flex>
                </Link>
              </div>

              <AntForm size='large' className='mt-5'>
                <FormItem>
                  <Input placeholder='Search' suffix={<Button size='small' className='border-0'><i className="fa-solid fa-magnifying-glass"></i></Button>} />
                </FormItem>
              </AntForm>

              <div className="product-banner mt-5">
                <Avatar src={banner.src} className='img-fluid rounded-0' shape='square' />
              </div>
            </div>
          </Col>
          <Col span={24} lg={18} xl={18} xxl={18}>
            <Flex justify='space-between' align='center' gap={12}>
              <p>Showing 1–9 of 16 results</p>

              <Select
                placeholder="Default sorting"
                style={{ width: 160 }}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Flex>
            <Row gutter={[20, 20]} className='mt-5'>
              <Col span={24} className='mb-2'><h4 className='title fs-2'>Related products</h4></Col>
              {[...Array(6)].map(() => <Col span={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
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

            <div className="d-flex align-items-center justify-content-center mt-5">
              <Pagination />
            </div>
          </Col>

        </Row>
      </div>
    </section>
  )
}

ProductList.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}

export default ProductList