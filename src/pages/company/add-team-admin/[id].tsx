import AddTeamAdminCard from '@/components/AddTeamAdminCard'
import HenceforthIcons from '@/components/HenceforthIcons'
import { COOKIES_USER_RAIZE_ACCESS_TOKEN } from '@/context/actionTypes'
import { GlobalContext } from '@/context/Provider'
import { Button, Card, Col, Flex, Input, Row, TypographyText, TypographyTitle } from '@/lib/AntRegistry'
import henceforthApi from '@/utils/henceforthApi'
import { Grid } from 'antd'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'

const AddTeamAdmin = () => {
  const router = useRouter()
  const {user_type} = router.query
  const [departmentName,setDepartmentName]=useState()as any;
  const { Toast ,userType} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false)
  const [email,setEmail] = useState("")
 
  const handleSubmit = async () => {
    debugger
    setLoading(true);
    try {
      let apiRes = await henceforthApi.Team.addTeamMember({email:email})
      router.replace(`/company`);
      } catch (error:any) {
        Toast.error(error?.response?.body?.message)
      setLoading(false);

    }
  };

  const data = [
    {
        title:'Accounting',
        icon:<HenceforthIcons.TAaccounting/>
    },
    {
        title:'HR',
        icon:<HenceforthIcons.TAHr/>
    },
    {
        title:'Operation',
        icon:<HenceforthIcons.TAOperations/>
    },
    {
        title:'Business Development',
        icon:<HenceforthIcons.TABusinessDev/>
    },
    {
        title:'Design',
        icon:<HenceforthIcons.TADesign/>
    },
    {
        title:'Marketing',
        icon:<HenceforthIcons.TAMarketing/>
    },
    {
        title:'Management',
        icon:<HenceforthIcons.TAManagement/>
    },
    {
        title:'Research & Development',
        icon:<HenceforthIcons.TAResearchDev/>
    },
    {
        title:'Information Technology',
        icon:<HenceforthIcons.TAInfoTech/>
    },
    {
        title:'Legal',
        icon:<HenceforthIcons.TALegal/>
    },
    {
        title:'Customer Support',
        icon:<HenceforthIcons.TACustomerSupport/>
    },
]

useEffect(()=>{
  const token=parseCookies()[COOKIES_USER_RAIZE_ACCESS_TOKEN];
  henceforthApi.setToken(token);
  console.log("tokenfoundinid",token)
  async function getDepartmentName(){
    const apiRes=await henceforthApi.Department.getDepartment(String(router.query.id))
    setDepartmentName(apiRes)
  }
  getDepartmentName();
  
},[])

const screens = Grid.useBreakpoint();
  return (
    <section className="add-team-admin-section department_section h-100 overflow-auto px-0 py-3 p-sm-5">
      <div className="container-fluid px-sm-4 ">
        <Row gutter={[20,20]}>
          <Col span={24}>
            <TypographyTitle level={screens.sm ? 2 : 4} className='mb-0 mb-sm-3'>Add Team Admin</TypographyTitle>
          </Col>
          <Col span={24} md={12} lg={12} xl={12} xxl={8}>
          <Card bordered={false} className="add-team-admin-card h-100">
            <Flex className="w-100" align="center" gap={20}>
                <div className="icon">
                <HenceforthIcons.TACustomerSupport/>
                </div>
                <div className="w-100">
                    <TypographyText className="fw-semibold d-block mb-2">Team admin of {departmentName?.title+" department"}</TypographyText>
                    <Input onChange={(e:any) => setEmail(e.target.value)} placeholder="Enter email" size="large" className="border ps-3"/>
                </div>
            </Flex>
        </Card>
          </Col>
          {/* {data.map((res, index)=><Col key={index} span={24} md={12} lg={12} xl={12} xxl={8}>
            <AddTeamAdminCard res={res}/>
          </Col>)} */}

          {/* <Col span={24} md={12} lg={12} xl={12} xxl={8} className='mt-4'>
          <Button loading={loading} onClick={() => handleSubmit()} type='primary' size='large' block>Next</Button>
          </Col> */}
        </Row>
        <Row gutter={[20,20]}>
        <Col span={24} md={12} lg={12} xl={12} xxl={8} className='mt-4'>
          <Button className='w-100' loading={loading} onClick={() => handleSubmit()} type='primary' size='large' block>Next</Button>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default AddTeamAdmin
