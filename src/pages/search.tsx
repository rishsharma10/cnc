import CommonLayout from '@/components/common/CommonLayout'
import { AntForm, Button, Col, FormItem, Input, Row } from '@/lib/AntRegistry'
import React, { ReactElement, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import crumbApi from '@/utils/crumbApis';
import ProductCard from '@/components/ProductCard';
const Search = () => {
  const [state, setState] = useState({ data: [], count: 0 })


  const initProductList = async (name:string) => {
    try {
      let apiRes = await crumbApi.Product.list();
      const filteredProducts = apiRes.data.filter((product:any) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      setState({data:filteredProducts,count:filteredProducts?.length});
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };
  
  return (
    <>
      <section className="search-section">
        <div className="container">
          <Row gutter={[20, 20]} justify={'center'}>
            <Col span={24} lg={14} xl={12} xxl={12}>
              <div className="search-container">
                <AntForm className='mb-4'>
                  <FormItem>
                    <Input onChange={(e) => initProductList(e.target.value)} className="border border-dark py-0 pe-0" placeholder="Search product" suffix={<Button className="bg-transparent border-0 py-3 h-100 px-4"><SearchOutlined /></Button>} />
                  </FormItem>
                </AntForm>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="cart-section ">
        <div className="container">
          <Row gutter={[20, 20]} justify={'center'}>

            {Array.isArray(state?.data) && state?.data.map((res: any, index: number) => <Col key={index} span={24} sm={12} md={12} lg={6} xl={6} xxl={6}> <ProductCard {...res} /></Col>)}
          </Row>
        </div>
      </section>
    </>
  )
}
Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout>
      {page}
    </CommonLayout>
  )
}
export default Search