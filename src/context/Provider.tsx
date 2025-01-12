import React, {
  createContext,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { message, theme, Tour } from "antd";
import { Open_Sans } from "next/font/google";
import { ConfigProvider } from "@/lib/AntRegistry";
import { useRouter } from "next/router";
import {
  COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN,
} from "./actionTypes";
import { destroyCookie } from "nookies";
import crumbApi from "@/utils/crumbApis";



type ToastFunction = (msg: any) => void;

interface CommonContextType {
  loading: boolean;
  requestNotification: () => string;
  loginWithSocial: any;
  initLoginWithGoogle: (str: string) => string;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  Toast: {
    error: ToastFunction;
    success: ToastFunction;
    warning: ToastFunction;
  };
  userInfo: any;
  logout: Function;
  user_info: any;
  setUserInfo: any;
  setUserType: any;
  capitalizeFirstLetter: any;
  userType: any;
  Video: {
    startRecording: any;
    stopRecording: any;
    recording: any;
    recordedChunks: any;
    chunks: any;
    videoUrl: any;
    recordedVideoURL: any;
    duration: any;
    streaming: any;
    Recorder: any;
    screenRecording: any;
    screenRecordingChunks: any;
    startScreenRecording: any;
    setStreaming: any;
    setVideoUrl: any;
  };
  uploadImages: any;
  setClickedTexts: any;
  setPic: any;
  cartData:any;
  isCart:(pid:number) => boolean;
}
export const GlobalContext = createContext({} as CommonContextType);
type GlobleContextProviderProps = {
  children: ReactNode;
  access_token: string;
  user_info: any;
  userType: string;
  signInPrivacy: string;
  theme?: {
    direction: string;
    colorPrimary: string;
  };
};

const { defaultAlgorithm, darkAlgorithm } = theme;

function GlobalProvider(props: GlobleContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  crumbApi.setToken(props?.user_info?.access_token);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userType, setUserType] = useState(props?.user_info?.userType);
  console.log(userType, "setUserType");

  const [userInfo, setUserInfo] = useState(props?.user_info);
  const [colorPrimary, setColorPrimary] = React.useState(
    props?.theme?.colorPrimary || "#3F4032"
  );
  const [recording, setRecording] = useState(false);
  const screenRecording = useRef<any>(null);
  const [Recorder, setRecorder] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const [streaming, setStreaming] = useState<any>(false);
  var t0 = useRef<number>(-1);
  const screenRecordingChunks: any = [];
  const [chunks, setChunks] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  // const { socket, socketConnected } = useSocket(crumbApi.API_ROOT as string, userInfo?.access_token)
  const success = (success: any) => {
    messageApi.open({
      type: "success",
      content: success,
    });
  };
  console.log(userInfo, "userInfouserInfouserInfo");

  const capitalizeFirstLetter = (string: any) => {
    if (!string) return "";
    const newString = string
      .split("_")
      .map((word: any) => word.toLowerCase())
      .map((word: any) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    return newString;
  };

  const error = (error: any) => {
    let errorBody = error?.response?.body;
    let message = errorBody?.message;
    let error_message = errorBody?.error_description;

    if (message === "Unauthorized") {
      router.replace("/");
    }
    messageApi.open({
      type: "error",
      content: message
        ? message
        : typeof error_message == "string"
        ? error_message
        : error_message
        ? JSON.stringify(error_message)
        : JSON.stringify(error),
      duration: 3,
    });
    setTimeout(messageApi.destroy, 3000);
  };

  const warning = (warning: any) => {
    messageApi.open({
      type: "warning",
      content: warning,
    });
  };

  const Toast = {
    success,
    warning,
    error,
  };

  const stopSpaceEnter = (event: any) => {
    if (String(event.target.value).length == 0 && event.which == 32) {
      event.preventDefault();
    }
    if (
      (event.keyCode < 65 || event.keyCode > 90) &&
      (event.keyCode < 97 || event.keyCode > 122) &&
      event.keyCode !== 32
    ) {
      return false;
    }
    return true;
  };
  const logout = async () => {
    setUserInfo(null as any);
    destroyCookie(null, COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN, {
      maxAge: 0,
      path: `/`,
    });
    router.replace(`/${userType ? userType : "company"}/auth/login`);
  };

  const [cartData,setCartData] = useState({data:[],count:0})
  const initCart = async () => {
    try {
      let apiRes = await crumbApi.Cart.list()
      setCartData({data:apiRes.cart,count:apiRes?.cart?.length})
    } catch (error) {
      
    }
  }
 const isCart = (pid:any) => {
    const isInCart = Array.isArray(cartData?.data) && cartData?.data.some((item:any) => item.id === pid);
    return isInCart ? true : false;
  }

  const getProfile = async () => {
    try {
      const apiRes = await crumbApi.Auth.profile();
      setUserInfo(apiRes?.data);
    } catch (error: any) {}
  };
  console.log(router, "routerrrrrrr");

  useEffect(() => {
    initCart()
  },[])

  return (
    <GlobalContext.Provider
      value={
        {
          ...props,
          logout,
          userType,
          loading,
          setLoading,
          setUserType,
          isCart,
          capitalizeFirstLetter,
          cartData,
          Toast,
          setUserInfo,
          userInfo,
          stopSpaceEnter,
        } as any
      }
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: colorPrimary,
            // fontFamily: openSans.style.fontFamily,
            // colorBorderBg: "#f6f6f6",
          },
          components: {
            DatePicker: {
              lineWidth: 1,
              borderRadiusLG: 40,
              borderRadius: 40,
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              controlHeight: 36,
              controlHeightLG: 40,
              fontWeightStrong: 600,
              colorBorder: "transparent",
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
            },
            Form: {
              verticalLabelPadding: 4,
              labelColor: "#464646",
              itemMarginBottom: 16,
              labelHeight: 10,
              fontSize:16
            },
            InputNumber: {
              lineWidth: 2,
            },
            Input: {
              lineWidth: 1,
              borderRadiusLG: 0,
              borderRadius: 0,
              borderRadiusOuter: 0,
              borderRadiusSM: 0,
              controlHeightLG: 50,
              controlHeight: 42,
              colorBgContainer: "transparent",
              colorTextPlaceholder: "#828282",
              fontSize: 16,
              colorText: "#121212",
              paddingInlineLG: 20,
              fontWeightStrong: 400,
              colorFillTertiary: "#EDEDED",
            },

            Select: {
              lineWidth: 1,
              borderRadiusOuter: 0,
              borderRadius: 0,
              borderRadiusLG: 0,
              colorBorder: "#dddddd",
              colorText: "#828282",
              colorTextPlaceholder: "#828282",
              fontSize: 16,
              controlHeightLG: 50,
              controlHeight: 42,
              colorBgContainer: "rgba(255, 255, 255, 0.5)",
            },
            Card: {
              paddingContentHorizontal: 0,
              paddingContentVertical: 0,
              colorBorderSecondary: "#E6E6E6",
              padding: 0,
              borderRadius: 12,
              borderRadiusLG: 12,
              colorBgContainer: "#ffffff",
              paddingLG: 0,
              paddingMD: 0,
              paddingSM: 0,
            },
            Radio: {
              colorPrimary: colorPrimary,
              dotSize: 9,
              radioSize: 18,
            },

            Button: {
              borderRadiusLG: 0,
              borderRadiusSM: 0,
              borderRadius: 0,
              lineWidth: 1,
              fontSize: 14,
              fontSizeLG: 14,
              controlHeightLG: 50,
              controlHeight: 42,
              controlHeightSM: 36,
              borderColorDisabled: "transparent",
              colorBgContainerDisabled: "#fdc8467a",
              colorTextDisabled: "#fff",
              fontWeight: 500,
              defaultColor: "#000000",
              defaultBorderColor: "#000000",
              defaultBg: "transparent",
              colorErrorBg: "yellow",
              boxShadow:'0'
            },
            Tabs: {
              fontWeightStrong: 800,
              fontSize: 16,
              colorText: "#828282",
              colorPrimary: colorPrimary,
            },
            Pagination: {
              borderRadius: 8,
              // itemActiveBg: '#FDC846',
              colorPrimary: "#FDC846",
              colorPrimaryHover: "#FDC846",
            },
            Upload: {
              margin: 20,
              colorError: "#E6E6E6",
            },
            Typography: {
              fontSizeHeading1: 60,
              fontSizeHeading2: 32,
              fontSizeHeading3: 26,
              fontSizeHeading4: 24,
              fontSize: 14,
              fontSizeHeading5: 20,
              colorText: "#121212",
              colorTextHeading: "#121212",
              titleMarginTop: 0,
              colorTextSecondary: "#828282",
            },
            Switch: {
              colorPrimary: colorPrimary,
              handleSizeSM: 10,
              trackPadding: 4,
              colorTextQuaternary: "#EF8E8B",
              trackHeightSM: 20,
              trackMinWidthSM: 32,
            },
            Dropdown: {
              padding: 0,
              paddingLG: 0,
              controlItemBgHover: "transparent",
              boxShadow: "0px 4px 24px 0px #0000000A",
              colorBgElevated: "#ffffff",
              colorBorder: "#1A1A1A",
              colorText: "#121212",
              borderRadius: 12,
              borderRadiusLG: 12,
              borderRadiusSM: 12,
              borderRadiusXS: 12,
            },
            Rate: {
              controlHeight: 50,
              controlHeightLG: 50,
            },
            Checkbox: {
              lineWidth: 2,
              colorBorder: colorPrimary,
              borderRadiusLG: 0,
              borderRadiusSM: 0,
            },
            Breadcrumb: {
              lastItemColor: "#545454",
              linkHoverColor: "#545454",
              colorText: "#545454",
            },
            Divider: {
              lineWidth: 1,
              fontSize: 26,
              colorText: "#000000",
            },
            Collapse: {
              borderRadiusLG: 0,
              borderRadius: 0,
              colorBgElevated: "#ffffff",
              colorBorder: "#E5E5E5",
              colorFillAlter: "#ffffff",
              colorTextHeading: "#121212",
              fontSize: 16,
            },
            Modal: {
              borderRadius: 8,
              borderRadiusLG: 8,
              contentBg: "#ffffff",
              headerBg: "#ffffff",
              titleColor: "#000000",
            },
            Table: {
              colorTextHeading: "#828282",
              fontSize: 14,
              borderRadius: 24,
              headerBg: "rgba(246, 243, 254, 1)",
              colorBgContainer: "transparent",
              borderColor: "transparent",
              colorText: "#121212",
            },
            Statistic: {
              colorText: "#fff",
            },
            Spin: {
              colorPrimary: colorPrimary,
            },
            Tag: {
              borderRadius: 40,
              borderRadiusLG: 40,
              borderRadiusSM: 40,
            },
            Progress: {
              defaultColor: colorPrimary,
            },
            // Layout: {
            //     siderBg: '#000000'
            // }
          },
        }}
      >
        {props.children}
        {contextHolder}
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
