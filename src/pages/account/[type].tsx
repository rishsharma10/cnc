import CommonLayout from '@/components/common/CommonLayout';
import React, { ReactElement, useEffect } from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useRouter } from 'next/router';
import ProfileCompo from '@/components/user/ProfileCompo';
import OrderList from '@/components/user/OrderList';
import crumbApi from '@/utils/crumbApis';
import CommonBanner from '@/components/CommonBanner';
import bannerImg from '@/assets/images/freshly-baked-sweet-buns-puff-pastry.jpg'

const Account = () => {
    const router = useRouter()

    const onChange = (key: string) => {
        console.log(key);
        
        router.replace(`/account/${key}`,undefined,{shallow:true});
      };

      const updateUserData = async () => {
        const payload = {
            first_name:"hello"
        }
        try {
            let apiRes = await crumbApi.Auth.updateAddress(payload)
        } catch (error) {
            
        }
      }
      const orderList = async () => {
        try {
            let apiRes = await crumbApi.Order.list()
            console.log(apiRes)
        } catch (error) {
            
        }
      }
      
      const items: TabsProps['items'] = [
        {
          key: 'profile',
          label: 'Profile',
          children: <ProfileCompo/>,
        },
        {
          key: 'orders',
          label: 'Orders',
          children: <OrderList/>,
        },
      ];
      useEffect(() => {
        orderList()

      },[router.query.type])

  return (
    <>
     <CommonBanner title={router.query.type == "profile" ? "Profile" : "My Orders"} image={bannerImg.src} />
    <div className='mt-2 p-3 p-sm-5'>

        {/* <Tabs defaultActiveKey={String(router.query.type)} items={items} onChange={onChange} /> */}
        {router.query.type == "profile" ? <ProfileCompo/> : <OrderList/>}
    </div>
    </>
  )
}
Account.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>
  {page}
</CommonLayout>
};
export default Account