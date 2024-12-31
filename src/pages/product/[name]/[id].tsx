import CommonLayout from '@/components/common/CommonLayout'
import React, { ReactElement } from 'react'

const ProductDetails = () => {
  return (
    <div>product details</div>
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