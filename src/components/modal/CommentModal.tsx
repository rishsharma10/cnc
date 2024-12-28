import {
  AntForm,
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Flex,
  FormItem,
  Input,
  Modal,
  Row,
  TypographyText,
  TypographyTitle,
} from "@/lib/AntRegistry";
import React, { useState } from "react";
import CommentCard from "../CommentCard";
import HenceforthIcons from "../HenceforthIcons";
import profile from "@/assets/images/profile.png";
import henceforthApi from "@/utils/henceforthApi";
import { useRouter } from "next/router";
import { AutoComplete, List, Mentions } from "antd";
import type { MentionProps } from 'antd';

const CommentModal = ({
  open,
  setOpen,
  addComment,
  loading,
  form,
  list,
  selectedUserId,
  setSelectedUserId,
  updatedInput,
  setUpdatedInput,
  handleDoNothing,
  handleInvite,
}: any) => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    count: 0,
    data: [],
  });
  const [search, setSearch] = useState<any>("");
  const [inputValue, setInputValue] = useState<any>("");
  // const [selectedUserId, setSelectedUserId] = useState<any>([]);
  let query = router.query;

  //   const handleInputSearch = async (value: string) => {
  //     try {
  //       console.log(value, "stryyvalueeee");
  //       if (value?.includes("@")) {
  //         setSearch(value)
  //       }
  //     } catch (error) {}
  //   };

  console.log(list, "listtttttttt");

  const countAtSymbols = (str: string) => {
    return (str.match(/@/g) || []).length;
  };
  const handleInputSearch = (value: string) => {
    debugger;
    try {
      const lengthOfChar = countAtSymbols(value);
      console.log(lengthOfChar, "lengthOfCharlengthOfChar");
      console.log(selectedUserId?.length, "selectedUserIdselectedUserId");

      setUpdatedInput(value);
      setInputValue(value);
      console.log(value, "stryyvalueeee");
      let selectedUserIdLength =
        Array.isArray(selectedUserId) && selectedUserId?.length
          ? selectedUserId?.length
          : 0;

          if(value[value.length-1]==="@"){
            setSearch((prev:any)=>prev+"")
          }
      
      if (lengthOfChar > selectedUserIdLength) {
        debugger;
        if (value.includes("@")) {
          let arr=value.split("@");
          setSearch(arr[arr.length-1])
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleSelectUser = (data: any) => {
    debugger;
    try {
      setSelectedUserId((prevItems: any) => {
        // Check if the _id already exists in the array
        if (prevItems?.includes(data._id)) {
          return prevItems; // If it exists, return the current array unchanged
        } else {
          return [...prevItems, data._id]; // Otherwise, append the _id to the array
        }
      });
      // addHelloAfterLastAt(inputValue)
      // handleAddHello()
      const [localPartOfEmail] = data.email.split("@");
      const updated = addHelloAfterLastAt(
        inputValue,
        data?.name ?? localPartOfEmail
      );
      setUpdatedInput(updated);
      // setInputValue(inputValue.sp)
      setSearch("");
      console.log(data, "datadata");
    } catch (error) {
      console.error(error);
    }
  };

  const addHelloAfterLastAt = (str: string, name: string) => {
    debugger;
    const lastIndex = str.lastIndexOf("@");
    if (lastIndex !== -1) {
      // Insert "HELLO" after the last "@" and remove any text after it
      return str.slice(0, lastIndex + 1) + name;
    }
    return str;
  };

  // const handleAddHello = () => {
  //   const updated = addHelloAfterLastAt(inputValue);
  //   setUpdatedInput(updated);
  // };
  console.log(selectedUserId, "selecteduserud");
  console.log(search, "setsearchhhhhh");

  console.log(inputValue, "inputValueinputValue");
  console.log(updatedInput, "updatedInputupdatedInputupdatedInput");

  const initDataUser = async () => {
    debugger;
    try {
      let urlSearchParam = new URLSearchParams();

      if (query.pagination) {
        urlSearchParam.set("pagination", String(Number(query.pagination) - 1));
      }
      if (search) {
        urlSearchParam.set("search", String(search));
      }
      urlSearchParam.set("filter", "ALL");
      urlSearchParam.set("process_id", String(router.query._id));
      let apiRes = await henceforthApi.Process.userListSearch(
        urlSearchParam.toString()
      );
      setUser(apiRes?.data);
    } catch (error) {}
  };
  console.log(user, "user");
  const MOCK_DATA = {
    '@': ['afc163', 'zombiej', 'yesmeck'],
  }
  const [prefix, setPrefix] = useState<PrefixType>('@');
  type PrefixType = keyof typeof MOCK_DATA;
  const onSearch: MentionProps['onSearch'] = (_:any, newPrefix:any) => {
    setPrefix(newPrefix as PrefixType);
  };

  React.useEffect(() => {
    initDataUser();
  }, [search]);
  return (
    <Modal
      title={
        <TypographyTitle level={5} className="m-0 text-center">
          Add Comment
        </TypographyTitle>
      }
      centered
      footer={null}
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    >
      <div
        className="modal_content d-flex flex-column"
      
      >
        <div  style={{ maxHeight: 600, minHeight: 300 }} className="pe-3 pt-4 overflow-auto">
          {Array.isArray(list.data) && list.data?.length ? (
            list.data.toReversed().map((res: any, index: number) => (
              <div key={res._id}>
                <CommentCard {...res} />
                {list?.data?.length - 1 !== index ? (
                  <Divider className="my-3" />
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <div className="my-5 text-center w-100">
              {" "}
              <Empty className="mb-5" />
            </div>
          )}

          {/* invite card */}
          {Array.isArray(list.mentions) &&
            list.mentions.slice(0, 1).map((res: any, index: number) => {
              // const [localPartOfEmail] = res?.user_id?.email?.split("@")
              return (
                <Col
                  span={24}
                  className="overflow-y-auto py-3"
                >
                  <Card
                    bordered={false}
                    className="common_card p-3"
                    style={{
                      background:
                        "linear-gradient(134.67deg, rgba(236, 139, 201, 0.1) 0%, rgba(240, 155, 170, 0.1) 100%)",
                    }}
                  >
                    <Flex gap={8} className="mb-2">
                      <Avatar src={profile.src} size={36} />
                      <div>
                        <TypographyTitle className="m-0 fs-16" level={5}>
                          Raize
                        </TypographyTitle>
                        <TypographyText type="secondary" className="fs-12">
                          You mentioned{" "}
                          {Array.isArray(list.mentions) &&
                            list.mentions
                              .map(
                                (item: any) => `@${item.user_id?.name ?? "N/A"}`
                              )
                              .join(",")}
                          , but they don’t have the access of this process
                        </TypographyText>
                      </div>
                    </Flex>
                    <Flex gap={10}>
                      <Button
                        onClick={() => handleInvite()}
                        type="primary"
                        ghost
                        className="px-4 bg-white"
                      >
                        Invite Them
                      </Button>
                      <Button
                        onClick={() => handleDoNothing(res.comment_id)}
                        type="primary"
                        ghost
                        className="px-4 bg-white"
                      >
                        Do Nothing
                      </Button>
                    </Flex>
                  </Card>
                </Col>
              );
            })}
        </div>

        {/* enter comment */}
        <div className="w-100 bg-white px-3 pb-2">
          <div className="comment_input mt-3 position-relative">
            {search && user.data.length ? (
              <List
              className="position-absolute bg-white w-100 left-0"
              style={{bottom:42}}
                bordered
                dataSource={user.data}
                renderItem={(item: any) => (
                  <List.Item
                    role="button"
                    onClick={() => handleSelectUser(item)}
                  >
                    {item?.name ?? item?.email}
                  </List.Item>
                )}
              />
            ):""}
            <AntForm onFinish={addComment} form={form}>
              {/* <FormItem
                name="comment"
                rules={[{ required: true, message: "Please enter comment" }]}
              > */}

              <Input
                className="pe-1 border py-1"
                value={updatedInput}
                onChange={(e: any) => handleInputSearch(e.target.value)}
                placeholder="Enter comment here..."
                suffix={
                  <Button
                    disabled={!inputValue.length}
                    loading={loading}
                    type="text"
                    size="small"
                    shape="circle"
                    htmlType="submit"
                    className="h-100 p-0"
                  >
                    <HenceforthIcons.SendGradient />
                  </Button>
                }
              />
              {/* <Mentions
      style={{ width: '100%' }}
      placeholder="input @ to mention people, # to mention tag"
      prefix={['@', '#']}
      onSearch={onSearch}
      options={(MOCK_DATA[prefix] || []).map((value) => ({
        key: value,
        value,
        label: value,
      }))}
    /> */}

              {/* </FormItem> */}
            </AntForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
