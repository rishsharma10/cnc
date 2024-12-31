import CommonLayout from '@/components/common/CommonLayout'
import React,{ReactElement} from 'react'

const About = () => {
  return (
    <div>About us</div>
  )
}
About.getLayout = function getLayout(page: ReactElement) {
    return (
        <CommonLayout>
            {page}
        </CommonLayout>
    )
}
export default About