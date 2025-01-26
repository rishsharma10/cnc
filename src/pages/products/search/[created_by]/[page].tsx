import CommonBanner from '@/components/CommonBanner'
import { AntForm, Avatar, Button, Col, Dropdown, Empty, Flex, FormItem, Input, Pagination, Rate, Row, Select, Tabs } from '@/lib/AntRegistry'
import React, { ReactElement, useState } from 'react'
import productImage from '@/assets/images/front-view-cake-slice-with-cream-fresh-red-strawberries-inside-plate-getting-sugar-powder-dark-background.jpg'
import banner from '@/assets/images/espresso-pouring-from-coffee-machine-cafe.jpg'
import Link from 'next/link'
import { GetServerSideProps } from "next";
import CommonLayout from '@/components/common/CommonLayout'
import crumbApi from '@/utils/crumbApis'
import { useRouter } from 'next/router';
import ProductCard from '@/components/ProductCard'
import NoDataFound from '@/components/common/NodataFound'
const ProductList = (props: any) => {
  const router = useRouter()
  const obj = {
    "id": 'all',
    "name": "All Products",
}
const [category, SetCategory] = useState([obj, ...props.data]);
  const [state, setState] = useState({data:[],count:0})
  console.log(props, 'proppsspsp');
  console.log(category,'category');
  

  const initProductList = async () => {

    try {
      if(router.query.created_by == 'all'){
        let apiRes = await crumbApi.Product.list()
        setState({data:apiRes.data,count:apiRes?.data?.length})
      }else{
        let apiRes = await crumbApi.Category.productList(Number(router.query.created_by))
        setState({data:apiRes.data,count:apiRes?.data?.length})  
      }
    } catch (error) {

    }
  }
  React.useEffect(() => {
    initProductList()
  },[router.query.created_by])


  return (
    <section className='product-list-section pt-0 bg-white'>
      <CommonBanner title={"Our PRoduct"} />
      <div className="container mt-sm-5 pt-5">
        <Row gutter={[24, 24]} justify={'space-between'}>
          <Col span={24} lg={6} xl={6} xxl={6}>
            <div className='product-list-box'>
              <ul className='list-unstyled p-0 mb-5'>
                <h4>categories</h4>
                {Array.isArray(category) && category.map((res, index) => <div role='button' onClick={() => router.push({...router.query,query:{created_by:res?.id,page:router.query.page}})} key={res.id}><li className={`mb-2 fs-16 ${res.id == router.query.created_by ? "text-black" : "text-muted"}`}>{res.name}</li></div>)}

              </ul>

              {/* <div className="product-tag">
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
              </div> */}

              {/* <div className="top-rated-product">
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
              </div> */}

              {/* <AntForm size='large' className='mt-5'>
                <FormItem>
                  <Input placeholder='Search' suffix={<Button size='small' className='border-0'><i className="fa-solid fa-magnifying-glass"></i></Button>} />
                </FormItem>
              </AntForm> */}

              {/* <div className="product-banner mt-5">
                <Avatar src={banner.src} className='img-fluid rounded-0' shape='square' />
              </div> */}
            </div>
          </Col>
          <Col span={24} lg={18} xl={18} xxl={18}>
            {/* <Flex justify='space-between' align='center' gap={12}> */}
              {/* <p>Showing {state.count}–{state.count} of {state.count} results</p> */}

              {/* <Select
                placeholder="Default sorting"
                style={{ width: 160 }}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              /> */}
            {/* </Flex> */}
            <Row gutter={[20, 20]} className='mt-5'>
              {/* <Col span={24} className='mb-2'><h4 className='title fs-2'>Related products</h4></Col> */}
              {Array.isArray(state?.data) && state?.data?.length ? state?.data.map((res:any,index:number) => <Col key={index} span={24} sm={12} md={12} lg={8} xl={8} xxl={6}> <ProductCard class='product-related-image' {...res} key={index}/></Col>) : ""}
            </Row>

            {/* <div className="d-flex align-items-center justify-content-center mt-5">
              <Pagination />
            </div> */}
          {state?.data?.length !==0 ? "": <div><NoDataFound/></div>}
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apiRes = await crumbApi.Category.list();
    return { props: apiRes };
  } catch (error) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
};
export default ProductList