import CommonLayout from '@/components/common/CommonLayout'
import React,{ReactElement} from 'react'

const ProductList = () => {
  return (
    <div>ProductList</div>
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