import { Button, Col, TypographyText, TypographyTitle } from '@/lib/AntRegistry'
import React from 'react'

const OurStoryCard = ({span,lg,xl,xxl,img,title,desc}:any) => {
  return (
       <Col span={24} lg={12} xl={12} xxl={12}>
    <div className="our-story-right-col">
      <div className="our-story-image" style={{ height: 200 }}>
        <img src={img} alt="error" className='img-fluid' />
      </div>

      <div className="out-story-content-1 out-story-content">
        <TypographyTitle level={4}>{title}</TypographyTitle>
        {desc?.length > 500 ? <TypographyText>{`${desc}`}</TypographyText>:<TypographyText>{desc}</TypographyText>}
      {/* <Button className='mx-2 p-0 fw-semibold' color={`danger`} type='text'>{`Read more`}</Button> */}
      </div>
    </div>
  </Col>
  )
}

export default OurStoryCard