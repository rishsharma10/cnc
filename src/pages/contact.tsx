import CommonLayout from '@/components/common/CommonLayout'
import React,{ReactElement} from 'react'

const Contact = () => {
  return (
    <div>Contact us</div>
  )
}
Contact.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export default Contact