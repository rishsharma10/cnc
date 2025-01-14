import { Col, Row } from '@/lib/AntRegistry'
import React from 'react'
import banner from '@/assets/images/cappuccino-sits-elegantly-atop-pile-rich-coffee-beans.jpg'
const CommonBanner = ({title,image}:any) => {
  return (
    <div className="container-fluid px-0">
    <Row className='mx-0'>
        <Col span={24} className='px-0'>
            <div className="cart-banner" style={{ backgroundImage: `url(${image ? image :banner.src})` }}>
                <h2 className='position-relative'>{title}</h2>
            </div>
        </Col>
    </Row>
</div>

  )
}

export default CommonBanner