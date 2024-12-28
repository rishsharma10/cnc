import {
  AntForm,
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  Empty,
  Flex,
  FormItem,
  Input,
  TypographyText,
} from "@/lib/AntRegistry";
import React, { Fragment, useContext, useRef, useState } from "react";
import HenceforthIcons from "./HenceforthIcons";
import profile from "@/assets/images/logo_raize.png";

import henceforthApi from "@/utils/henceforthApi";
import { useRouter } from "next/router";
import { Form, Image, List, Spin } from "antd";
import { GlobalContext } from "@/context/Provider";
import {
  StarOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const ChatComponents = ({ setShareMsgs, set_Is_Forward, is_Forward }: any) => {
  const router = useRouter();
  const { Toast } = useContext(GlobalContext);
  const [form] = Form.useForm();
  let query = router.query;

  const [chat, setChat] = useState<any>({
    data: [] as any,
    count: 0,
    page: 0,
  });
  const [loadMore, setLoadMore] = React.useState<any>(null);
  const [loading, setLoading] = useState(false);
  //   const initData = async () => {
  //     let urlSearchParam = new URLSearchParams();

  //     if (query.pagination) {
  //       urlSearchParam.set("pagination", String(Number(query.pagination) - 1));
  //     }
  //     urlSearchParam.set("limit", String(10));
  //     urlSearchParam.set("process_id", String(query._id));
  //     try {
  //       let apiRes = await henceforthApi.Chat.list(urlSearchParam.toString());
  //       setChat(apiRes);
  //     } catch (error) {}
  //   };

  const handleSubmit = async ({ question }: any) => {
    if (!question) {
      return;
    }
    const items = {
      process_id: query._id,
      question,
    };
    try {
      setLoading(true);
      let apiRes = await henceforthApi.Chat.question(items);
      form.resetFields();
      await initData(chat.page);
      // setFocusedIndex(Number(chat.count));
    } catch (error: any) {
      form.resetFields();
      Toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteChatMsg = async (id: string) => {
    try {
      let apiRes = await henceforthApi.Chat.del(id);
      await initData(chat.page);
    } catch (error) {}
  };
  const deleteChatMsgMultiple = async () => {
    let arr: any =
      Array.isArray(chat.data) &&
      chat.data.filter((res: any) => res.is_checked);
      if(arr.length > 1){
        const ids = arr.map((item: any) => item._id);
        const queryString = ids.map((id: any) => `_ids=${id}`).join("&");
        try {
          let apiRes = await henceforthApi.Chat.delMultiple(queryString);
          
        } catch (error) {
          
        }
      }else{
        await deleteChatMsg(arr[0]?._id)
      }
      await initData(chat.page);
          set_Is_Forward(false);
          setShareMsgs("");
    
  };
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [sharedMsgLength, setShareMsgLength] = useState(0);
  const initData = async (page: number) => {
    debugger;
    setLoading(true);
    let urlSearchParam = new URLSearchParams();

    urlSearchParam.set("pagination", String(page));
    urlSearchParam.set("limit", String(10));
    urlSearchParam.set("process_id", String(query._id));
    try {
      let apiRes = await henceforthApi.Chat.list(urlSearchParam.toString());
      console.log(apiRes,"chatreceived")
      let data = apiRes;
      if (page) {
        let oldData = chat.data;
        let newData = [...oldData.toReversed(), ...data.data];
        setChat({
          ...chat,
          data: newData,
          page,
        });
        setFocusedIndex(chat?.data?.length ?? 9);
      } else {
        setChat({
          ...chat,
          ...data,
          page,
        });
        setFocusedIndex(7);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const divRef = useRef(null) as any;
  const itemsRef = useRef([]) as any;
  React.useEffect(() => {
    let page = chat.page;
    if (
      divRef?.current?.scrollTop + divRef?.current?.clientHeight >=
      divRef?.current?.scrollHeight
    ) {
      if (chat.data.length) {
        if (!loading) {
          if (chat.count != chat.data.length) {
            initData(Number(page) + 1);
          } else {
          }
        }
      }
    }
  }, [loadMore]);

  React.useEffect(() => {
    if (focusedIndex !== null && itemsRef.current[focusedIndex]) {
      itemsRef.current[focusedIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedIndex]);

  const handleForwardMsg = async (
    checked: boolean,
    index: number,
    res: any
  ) => {
    debugger;
    if (checked) {
      const data = chat.data;
      data[index].is_checked = true;
      setChat({
        ...chat,
        data,
      });
    } else {
      const data = chat.data;
      data[index].is_checked = false;
      setChat({
        ...chat,
        data,
      });
    }
    await handleShareMsgs();
  };

  let dataLengthSelected = [`${sharedMsgLength} selected`];
  const handleShareMsgs = async () => {
    try {
      debugger;

      let apiRes = await chat.data.filter((res: any) => res?.is_checked);
      setShareMsgLength(apiRes?.length);
      const formattedText = apiRes
        .map((item: any, index: number) => {
          return `que${index + 1}:${item.question}\nans${index + 1}:${
            item.answere
          }\n`;
        })
        .join("\n");
      console.log(apiRes, "apiesssss");
      setShareMsgs(formattedText);
    } catch (error) {}
  };

  const items = (index:number,res: any) => [
    {
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between px-0"
          loading={loading}
          onClick={() => deleteChatMsg(res._id)}
        >
          <HenceforthIcons.Delete />
          <TypographyText className="ms-2 fw-semibold">Delete</TypographyText>
        </Button>
      ),
      key: "1",
    },
    {
      label: (
        <Button
          type="text"
          className="d-flex align-items-center justify-content-between px-0"
          loading={loading}
          onClick={() => {set_Is_Forward(true);handleForwardMsg(true,index,res)}}
        >
          <HenceforthIcons.Unarchieve />
          <TypographyText className="ms-2 fw-semibold">Forward</TypographyText>
        </Button>
      ),
      key: "2",
    },
  ];
  React.useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", setLoadMore);
    }
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", setLoadMore);
      }
    };
  }, []);
  React.useEffect(() => {
    let page = chat.page;
    if (chat.count <= 10) {
      initData(Number(page));
    }
  }, []);

  return (
    <div
      className="chat_bot_container common_card p-0 d-flex flex-column mb-4"
      style={{ height: 500 }}
    >
      {/* chat_boat_header */}
      <div className="chat_boat_header">
        <Flex align="center" gap={8}>
          {/* <Image src={profile.src} width={36} > */}
          <Image preview={false}  src={profile.src} width={36} height={36} alt="logo" />
          <TypographyText style={{color:"#9778F7"}} className="fw-semibold fs-16">RAI</TypographyText>
        </Flex>
      </div>
      <div
        className="chat_boat_body p-3 d-flex flex-column gap-2 h-100 overflow-auto "
        ref={divRef}
      >
        <Spin spinning={loading}>
          {Array.isArray(chat.data) && chat.data?.length ?
            chat?.data?.toReversed().map((res: any, reverseIndex: number) => {
              const index = chat.data.length - 1 - reverseIndex;
              return (
                <div key={res._id} ref={(el) => (itemsRef.current[index] = el)}>
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <Checkbox
                      className={is_Forward ? "" : "d-none"}
                      checked={res.is_checked}
                      onChange={(e: any) =>
                        handleForwardMsg(e.target.checked, index, res)
                      }
                    ></Checkbox>
                    <div className="chat-btn  d-flex justify-content-between right_chat ms-auto my-2">
                      <div>{res?.question}?</div>
                      {!is_Forward && (
                        <Dropdown
                          trigger={["click"]}
                          menu={{ items: items(index,res) }}
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <div className="chat-btn-chevrondowndiv">
                              <HenceforthIcons.ChevronDownBlack />
                            </div>
                          </a>
                        </Dropdown>
                      )}
                    </div>
                  </div>
                  <div
                    className="left_chat"
                    dangerouslySetInnerHTML={{ __html: res?.answere }}
                  ></div>
                </div>
              );
            }):<div className="d-flex align-items-center justify-content-center" style={{marginTop:100}}><div style={{ textAlign: 'center' }}>
            <p>Ask Rai, your Excellence AI!</p>
          </div></div>}
        </Spin>
      </div>
      <div className="chat_boat_footer p-3">
        {!is_Forward ? (
          <AntForm onFinish={handleSubmit} form={form}>
            <FormItem className="m-0" name="question">
              <Input
                placeholder="Type your message here..."
                className="pe-2"
                suffix={
                  <Button
                    disabled={loading}
                    // loading={loading}
                    type="text"
                    htmlType="submit"
                    className="h-100 p-0"
                    shape="circle"
                  >
                    <HenceforthIcons.SendGradient />
                  </Button>
                }
              />
            </FormItem>
          </AntForm>
        ) : (
          <div
            style={{
              background: "#EBE3FF",
              borderRadius: "10px",
              padding: "10px",
              color: "#000",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <List
              style={{ color: "#000", margin: 0 }}
              dataSource={dataLengthSelected}
              renderItem={(item: any) => (
                <List.Item style={{ borderBottom: "none", color: "#000" }}>
                  {item}
                </List.Item>
              )}
            />
            <div>
              {/* <Button type="text" icon={<StarOutlined />} style={{ color: '#fff' }} /> */}
              <Button
                onClick={deleteChatMsgMultiple}
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "#000" }}
              />
              <Button
                onClick={() => {
                  initData(0);
                  set_Is_Forward(false);
                  setShareMsgLength(0);
                }}
                type="text"
                icon={<CloseCircleOutlined />}
                style={{ color: "#000" }}
              />
              {/* <Button type="text" icon={<ShareAltOutlined />} style={{ color: '#fff' }} /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponents;
