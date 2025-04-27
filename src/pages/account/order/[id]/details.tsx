import CommonLayout from '@/components/common/CommonLayout';
import CommonBanner from '@/components/CommonBanner';
import OrderDetails from '@/components/user/OrderDetails';
import React, { ReactElement } from 'react'
import bannerImg from '@/assets/images/freshly-baked-sweet-buns-puff-pastry.jpg'

const OrderDetail = () => {
  return (
      <div>
        <CommonBanner title={`Order Details`} image={bannerImg.src} />
         <OrderDetails/>
    </div>
  )
}
OrderDetail.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>
  {page}
</CommonLayout>
};
export default OrderDetail