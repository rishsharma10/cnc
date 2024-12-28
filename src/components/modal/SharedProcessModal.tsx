import { AntForm, Avatar, Button, Col, Flex, FormItem, Modal, Select, TypographyText, TypographyTitle } from '@/lib/AntRegistry';
import React from 'react'
import HenceforthIcons from '../HenceforthIcons';
import henceforthApi from '@/utils/henceforthApi';
import profile from "@/assets/images/profile.png";

const SharedProcessModal = ({name,type,loading,shareModalOpen,setShareModalOpen,handleChangeShared,onchangeItems,user,selectedItemsInternal,handleChangeInternal,form}:any) => {
  return <Modal
  maskClosable={false}
  title={
    <TypographyTitle level={5} className="m-0 text-center">
      {name}
    </TypographyTitle>
  }
  centered
  footer={null}
  open={shareModalOpen}
  onOk={() => setShareModalOpen(false)}
  onCancel={() => setShareModalOpen(false)}
>
  <AntForm size="large" className="mt-4" layout="vertical" form={form} onFinish={handleChangeShared}>
    <Col span={24}>
      <FormItem
        name="share_internaly"
        className="mb-4"
      >
        <Select
          onChange={(value) => onchangeItems(value,type)}
          mode="multiple"
          className='border rounded-pill'
          placeholder="Select an employee"
          suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
          options={
            Array.isArray(user.data) &&
            (user.data.map((res: any) => {
              return {
                value: res._id,
                label: res?.email ? res?.email : res.first_name ? `${res?.first_name} ${res?.last_name ?? ""}` : res?.email ? res?.email : "N/A"
              };
            }) as any)
          }
        />
      </FormItem>
    </Col>
    <FormItem>
      <Col span={24} className="mb-1">
        {Array.isArray(selectedItemsInternal.data) &&
          selectedItemsInternal.data.map((res: any, index: number) => (
            <Flex 
              key={res.user_id}
              className="mt-2 border rounded-pill p-2 mb-2"
              align="center"
              justify="space-between"
              gap={10}
            >
              <Flex align="center" gap={8}>
                <Avatar
                  src={
                    res?.profile_pic
                      ? henceforthApi.FILES.imageMedium(
                          res?.profile_pic,
                          ""
                        )
                      : profile.src
                  }
                  size={40}
                />
                <TypographyText>{res.name}</TypographyText>
              </Flex>
              {/* <Select
                value={res?.access_type}
                onChange={(value: any) =>
                  handleChangeInternal(value, index)
                }
                style={{width:100}}
                placeholder="Select access"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={[
                  { value: "VIEW", label: "View" },
                  { value: "EDIT", label: "Edit" },
                ]}
              /> */}
            </Flex>
          ))}
      </Col>
    </FormItem>
    <Button type="primary" loading={loading} block htmlType="submit">
      Submit
    </Button>
  </AntForm>
</Modal>

}

export default SharedProcessModal
