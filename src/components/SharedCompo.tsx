import { Avatar, Divider, Flex, Select, TypographyText } from '@/lib/AntRegistry'
import henceforthApi from '@/utils/henceforthApi'
import React, { Fragment } from 'react'
import profile from "@/assets/images/profile.png";
import HenceforthIcons from './HenceforthIcons'

const SharedCompo = ({res,handleChange,index,length}:any) => {
  return <Fragment>
  <Flex
    align="center"
    justify="space-between"
    gap={10}
  >
    <Flex align="center" gap={8}>
      <Avatar
        src={
          res?.user_id?.profile_pic
            ? henceforthApi.FILES.imageSmall(
                res?.user_id?.profile_pic
              )
            : profile.src
        }
      />
      <TypographyText>
        {res?.user_id?.name_name
          ? `${res?.user_id?.name} `
          : res?.user_id?.email
          ? res?.user_id?.email
          : "N/A"}
      </TypographyText>
    </Flex>
    <Select
      value={res?.access_type}
      onChange={(value: any) =>
        handleChange(value, index)
      }
      placeholder="Select access"
      suffixIcon={
        <HenceforthIcons.ChevronDownBlack
          color
        />
      }
      options={[
        { value: "VIEW", label: "View" },
        { value: "EDIT", label: "Edit" },
        { value: "REMOVE", label: "Remove" },
      ]}
    />
  </Flex>
  {length - 1 !== index && <Divider className="my-3" />}
  </Fragment>
}

export default SharedCompo
