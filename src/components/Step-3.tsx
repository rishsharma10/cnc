import {
  AntForm,
  Avatar,
  Button,
  Col,
  Flex,
  FormItem,
  Input,
  Row,
  Select,
  Space,
  TextArea,
  TimePicker,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React, { useContext, useState } from "react";
import { getMetadata } from "video-metadata-thumbnails";
import HenceforthIcons from "./HenceforthIcons";
import profile from "@/assets/images/profile.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalContext } from "@/context/Provider";
import henceforthApi from "@/utils/henceforthApi";
const CommonStep3 = (props: any) => {
  console.log(props,"stepprops3")
  const router = useRouter();
  const { user_type, pid } = router.query;
  const { uploadImages, raize, Video, userType } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [recStop, setRecStop] = useState<any>(false);

  console.log(Video, "videoooooooo");

  const stopRecording = async () => {
    debugger;
    //setLoading(true);
    try {
      Video.Recorder && Video.Recorder.stop();
      setRecStop(true);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  console.log();

  const finishProcess = async () => {
    debugger;
    setLoading(true)
    try {
      const videoUrl = await henceforthApi.Common.uploadFile(
        "file",
        Video?.videoUrl
      );
      const response = await fetch(`/api/video/${videoUrl?.file_name}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const metadata = await getMetadata(url);
      URL.revokeObjectURL(url); // Clean up the URL object
      const items: any = {
        video_url: videoUrl?.file_name,
        video_duration: String(metadata.duration),
      };
      // Set the source of the video

      const updateContent = await henceforthApi.Demo.updateVideoContent(
        String(pid),
        items
      );
      router.push(`/demo/process/details/view?pid=${pid}`);
      // router.push(`/demo/process/ss?pid=${pid}&video_url=${url}`);
    } catch (error) {
      setLoading(false);
    }
  };
  const [user, setUser] = React.useState({
    count: 0,
    data: [],
  });
  
  const onchangeItems = async (values: any) => {
    let filterSelectedItems: any = [];
    filterSelectedItems = await Array.isArray(user.data) && user.data.filter((res: any) => values?.includes(res._id))
    filterSelectedItems = await Array.isArray(filterSelectedItems) && filterSelectedItems.map((item: any) => {
        return {
            user_id: item._id,
            name: item?.first_name ? `${item?.first_name} ${item?.last_name ?? ""}` : item?.email ? item?.email : "N/A",
            access_type:"VIEW",
            profile_pic:item?.profile_pic
        }
    })
    props?.setSelectedItemsInternal({data:filterSelectedItems})
}
  const onchangeItemsExternal = async (values: any) => {
    let filterSelectedItems: any = [];
    filterSelectedItems = await Array.isArray(user.data) && user.data.filter((res: any) => values?.includes(res._id))
    filterSelectedItems = await Array.isArray(filterSelectedItems) && filterSelectedItems.map((item: any) => {
        return {
            user_id: item._id,
            name:item?.first_name ? `${item?.first_name} ${item?.last_name ?? ""}` : item?.email ? item?.email : "N/A",
            access_type:"VIEW",
            profile_pic:item?.profile_pic
        }
    })
    props?.setSelectedItemsExternal({data:filterSelectedItems})
}
const handleChangeInternal = (value:string,i:number) => {
  const data:any = props?.selectedItemsInternal.data
  data[i].access_type = value
  props?.setSelectedItemsInternal({
    ...props?.selectedItemsInternal,
    data
  })
}
const handleChangeExternal = (value:string,i:number) => {
  const data:any = props?.selectedItemsExternal.data
  data[i].access_type = value
  props?.setSelectedItemsExternal({
    ...props?.selectedItemsExternal,
    data
  })
}
console.log(props?.selectedItemsInternal,"selectedItems");

  const initDataUser = async () => {
    debugger;
    try {
      let apiRes = await henceforthApi.Process.userList("ALL");
      setUser(apiRes?.data);
    } catch (error) { }
  };
  console.log(user, "user");
  const dataArr = [
    { value: "0 - Open Access", label: "0 - Open Access" },
    { value: "1 - Limited Access", label: "1 - Limited Access" },
    { value: "2 - Confidential", label: "2 - Confidential" },
    { value: "3 - Restricted", label: "3 - Restricted" },
    { value: "4 - Top Secret", label: "4 - Top Secret" },
];
  React.useEffect(() => {
    initDataUser();
  }, []);
  console.log(Video, "Video");

  return (
    <React.Fragment>
      <AntForm size="large" layout="vertical" className="pt-4" onFinish={props?.onSubmit} scrollToFirstError>
        <Row gutter={[10, 0]}>
          <Col span={24} lg={12}>
            <FormItem className="mb-1" label={"Financial Data (F)"} name="financial_data" rules={[
              { message: "Please select financial data", whitespace: true, required: true },
            ]}>
              <Select
                placeholder="Level of sensitivity"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={dataArr}
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem className="mb-1" label={"Employee Data (E)"} name="emp_data" rules={[
              { message: "Please select employee data", whitespace: true, required: true },
            ]}>
              <Select
                placeholder="Level of sensitivity"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={dataArr}
              />
            </FormItem>
          </Col>
          <Col span={24} lg={12}>
            <FormItem className="mb-1" label={"Department Data (D)"} name="dep_data" rules={[
              { message: "Please select department data", whitespace: true, required: true },
            ]}>
              <Select
                placeholder="Level of sensitivity"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={dataArr}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem name="share_internaly" className="mb-4" label={"Shared Internal"}>
              <Select
              onChange={onchangeItems}
              mode="multiple"
              showSearch
                placeholder="Select an employee"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={Array.isArray(user.data) && user.data.map((res: any) => {
                  return {
                    value: res._id,
                    label: res?.email ? res?.email : res.first_name ? `${res?.first_name} ${res?.last_name ?? ""}` : res?.email ? res?.email : "N/A"
                  }
                }) as any}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              />
            </FormItem>
          </Col>
          <Col span={24} className="mb-1">
          {Array.isArray(props?.selectedItemsInternal.data) && props?.selectedItemsInternal.data.map((res:any,index:number) =>  <Flex key={res.user_id} className="mt-2 mb-2" align="center" justify="space-between" gap={10}>
              <Flex align="center" gap={8}>
                <Avatar src={res?.profile_pic ? henceforthApi.FILES.imageMedium(res?.profile_pic,"") : profile.src} size={40} />
                <TypographyText>{res.name}</TypographyText>
              </Flex>
              {/* <Button
                type="primary"
                className="w-25 d-flex align-items-center justify-content-between"
                ghost
              >
                View <HenceforthIcons.ChevronDownBlack />
              </Button> */}
              <Select
              value={res?.access_type}
              onChange={(value:any) => handleChangeInternal(value,index)}
                placeholder="Select access"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={[
                  { value: "VIEW", label: "View" },
                  { value: "EDIT", label: "Edit" },
                ]}
                
              />
            </Flex>)}
           
          </Col>
          <Col span={24}>
            <FormItem name="share_externaly" className="mb-4" label={"Shared External"}>
              <Select
              mode="multiple"
              onChange={onchangeItemsExternal}
                placeholder="Select an employee"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={Array.isArray(user.data) && user.data.map((res: any) => {
                  return {
                    value: res._id,
                    label: res?.email ? res?.email : res.first_name ? `${res?.first_name} ${res?.last_name ?? ""}` : res?.email ? res?.email : "N/A"
                  }
                }) as any}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              />
            </FormItem>
          </Col>
          <Col span={24} className="mb-1">
          {Array.isArray(props?.selectedItemsExternal.data) && props?.selectedItemsExternal.data.map((res:any,index:number) =>  <Flex key={res.user_id} className="mt-2 mb-2" align="center" justify="space-between" gap={10}>
              <Flex align="center" gap={8}>
                <Avatar src={res?.profile_pic ? henceforthApi.FILES.imageMedium(res?.profile_pic,"") : profile.src} size={40} />
                <TypographyText>{res.name}</TypographyText>
              </Flex>
              {/* <Button
                type="primary"
                className="w-25 d-flex align-items-center justify-content-between"
                ghost
              >
                View <HenceforthIcons.ChevronDownBlack />
              </Button> */}
              <Select
              value={res?.access_type}
              onChange={(value:any) => handleChangeExternal(value,index)}
                placeholder="Select access"
                suffixIcon={<HenceforthIcons.ChevronDownBlack color />}
                options={[
                  { value: "VIEW", label: "View" },
                  { value: "EDIT", label: "Edit" },
                ]}
              />
            </Flex>)}
           
          </Col>
        </Row>

        <Space
          size={"small"}
          direction="vertical"
          className="assign_process w-100 mt-3"
        >
          {/* <Link href={`/demo/process/ss`}> */}
          {/* {!recStop ? (
            <Button
              loading={loading}
              onClick={stopRecording}
              type="primary"
              className="mt-3"
              block
            >
              Stop Recording
            </Button>
          ) : (
            <Button
              loading={loading}
              onClick={finishProcess}
              type="primary"
              className="mt-3"
              block
            >
              Finish Process
            </Button>
          )} */}
          {/* </Link> */}
          <Button
            loading={props?.loading}
            disabled={props?.loading}
            type="primary"
            htmlType="submit"
            className="mt-3"
            block
          >
          {router.query?.recordable==="true"?"Record":"Submit"}
          </Button>
        </Space>
        <video
          className="d-none"
          ref={Video.screenRecording}
          height={300}
          width={600}
          controls
        />
      </AntForm>
    </React.Fragment>
  );
};
export default CommonStep3;
