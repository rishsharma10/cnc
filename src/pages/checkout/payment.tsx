import CommonLayout from '@/components/common/CommonLayout'
import React,{ReactElement} from 'react'

const Payment = () => {
  return (
    <div>Payment</div>
  )
}
Payment.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}

export default Payment