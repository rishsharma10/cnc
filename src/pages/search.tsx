import CommonLayout from '@/components/common/CommonLayout'
import { AntForm, Button, Col, FormItem, Input, Row } from '@/lib/AntRegistry'
import React, { ReactElement } from 'react'
import { SearchOutlined } from '@ant-design/icons';
const Search = () => {
  return (
    <>
      <section className="search-section">
        <div className="container">
          <Row gutter={[20, 20]} justify={'center'}>
            <Col span={24} lg={14} xl={12} xxl={12}>
              <div className="search-container">
                <AntForm className='mb-4'>
                  <FormItem>
                    <Input className="border border-dark py-0 pe-0" placeholder="Search product" suffix={<Button className="bg-transparent border-0 py-3 h-100 px-4"><SearchOutlined /></Button>} />
                  </FormItem>
                </AntForm>
              </div>
            </Col>
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