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
  COOKIES_USER_RAIZE_ACCESS_TOKEN,
  COOKIES_USER_TYPE,
} from "./actionTypes";
import { destroyCookie, setCookie } from "nookies";
import henceforthApi from "@/utils/henceforthApi";
import html2canvas from "html2canvas";
import { getMetadata } from "video-metadata-thumbnails";
import { getRoleForUrl, getTypeForUrl } from "@/utils/henceforthValidations";

const openSans = Open_Sans({
  weight: [ "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

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
  raize: [];
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
  henceforthApi.setToken(props?.user_info?.access_token);
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
  // const { socket, socketConnected } = useSocket(henceforthApi.API_ROOT as string, userInfo?.access_token)
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
    destroyCookie(null, COOKIES_USER_RAIZE_ACCESS_TOKEN, {
      maxAge: 0,
      path: `/`,
    });
    router.replace(`/${userType ? userType : "company"}/auth/login`);
  };

  const loadGoogleMapScript = (callback: any) => {
    if (
      typeof (window as any).google === "object" &&
      typeof (window as any).google.maps === "object"
    ) {
      callback();
    } else {
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://accounts.google.com/gsi/client`;
      window.document.body.appendChild(googleMapScript);
      googleMapScript.addEventListener("load", callback);
    }
  };

  const loginWithSocial = async (
    social_type: string,
    social_token: string,
    token_type?: string
  ) => {
    if (!social_token) return;
    destroyCookie(null, COOKIES_USER_RAIZE_ACCESS_TOKEN, {
      maxAge: 0,
      path: "/",
    });
    // let notificationToken = await requestNotification();
    let roleType = getTypeForUrl(router.pathname);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (social_token)
      try {
        const items = {
          social_type,
          social_token,
          type: roleType,
          timezone,
        } as any;
        // if (notificationToken) {
        //   items["fcm_token"] = notificationToken;
        // }
        let apiRes = await henceforthApi.Auth.socialLogin(items);
        const data = apiRes?.data;
        //console.log(data, "logggggggggggggggggggggggg");
        const accessToken = data?.access_token;
        henceforthApi.setToken(apiRes?.data?.access_token);
        setCookie(
          null,
          COOKIES_USER_TYPE,
          String(getRoleForUrl(apiRes?.data?.role)),
          {
            path: "/",
          }
        );
        if (accessToken) {
          // setCookie(null, COOKIES_USER_RAIZE_ACCESS_TOKEN, accessToken);
          setCookie(null, COOKIES_USER_RAIZE_ACCESS_TOKEN, accessToken, {
            path: `/`,
          });
        }
        let role = getRoleForUrl(apiRes?.data?.role);
        setUserType(role);
        setUserInfo(data);
        if (role == "company") {
          if (!apiRes?.data?.is_profile_setup) {
            router.replace(`/${role}/auth/setup-your-profile`);
          } else if (!apiRes?.data?.is_department_added) {
            router.replace(`/${role}/auth/department`);
          } else {
            router.replace(`/${role}`);
          }
        } else if (role == "team") {
          if (!apiRes?.data?.is_profile_setup) {
            router.replace(`/${role}/auth/setup-your-profile`);
          } else {
            router.replace(`/${role}`);
          }
        } else if (role == "member") {
          if (!apiRes?.data?.is_profile_setup) {
            router.replace(`/${role}/auth/setup-your-profile`);
          } else {
            router.replace(`/${role}`);
          }
        }
      } catch (error: any) {
        Toast.error(error);
      }
  };
  console.log(userType, "userTypeuserTypeuserType");

  const loginWithGoogle = async (response: any) => {
    await loginWithSocial("GOOGLE", response.credential);
  };

  const initLoginWithGoogle = (id: string) => {
    loadGoogleMapScript(() => {
      const google = (window as any).google;
      google?.accounts?.id?.initialize({
        client_id:
          "283960079753-s7lis0jv2c5gdfkv6o0u89q5a5tkd0gr.apps.googleusercontent.com",
        callback: loginWithGoogle,
        cancel_on_tap_outside: false,
      });
      google?.accounts?.id?.renderButton(document.getElementById(id), {
        theme: "dark",
        size: "large",
        type: "standard",
        width: "400px",
        Shape: "pill",
        text: "continue_with",
      });
      // google?.accounts?.id?.prompt()
    });
  };

  const AllUserType = ["admin", "company", "team", "member"];
  const user_type =
    router.query.user_type == "undefined"
      ? "company"
      : userType !== router.query.user_type
      ? router.query.user_type
      : userType;
  console.log(user_type, "usertyppeppepe");

  const [pic, setPic] = useState<any>([]);
  const [clickedTexts, setClickedTexts] = useState<any>([]);

  const [textClick, setTextClick] = useState("");
  const [screenshot, setScreenshot] = useState({});

  const base64ToBlob = (base64String: any) => {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "image/png" });
  };

  const setStateText = async (text: any, type: string) => {
    if (!text) return;
    if (type == "TEXT") {
      setClickedTexts((prevClickedTexts: any) => [
        ...prevClickedTexts,
        `Click on ${text}`,
      ]);
    } else {
      setPic((prevClickedTexts: any) => [...prevClickedTexts, text]);
    }
  };

  const handleClick = async (event: any) => {
    // Get the text content of the clicked element
    const clickedText = event.target.textContent;
    const clickedElement = event.target;
    await setStateText(clickedText, "TEXT");
    // setTextClick(clickedText)
    console.log("Clicked Text:", clickedText); // Log or use the clicked text wherever you want
    if (clickedElement.tagName === "SELECT") {
      // If it's a dropdown, get the text of the selected option
      const selectedOption =
        clickedElement.options[clickedElement.selectedIndex];
      const selectedText = selectedOption.textContent;
      await setStateText(selectedText, "TEXT");
      // setTextClick(clickedText)
      console.log("Selected Text:", selectedText);
    } else if (clickedElement.type === "checkbox") {
      // If it's a checkbox, get the label associated with it
      const labelElement = document.querySelector(
        `label[for="${clickedElement.id}"]`
      );
      if (labelElement) {
        const labelText = labelElement.textContent;
        await setStateText(labelText, "TEXT");
        // setTextClick(clickedText)
        console.log("Checkbox Label:", labelText);
      }
    }

    // Take screenshot of the entire webpage
    html2canvas(document.body).then((canvas: any) => {
      // Convert canvas to image
      const screenshot = canvas.toDataURL();

      // Do whatever you want with the screenshot, like logging it
      console.log("Screenshot:", base64ToBlob(screenshot));

      setStateText(base64ToBlob(screenshot), "IMG");
      // setScreenshot(base64ToBlob(screenshot))
    });
  };
  console.log(clickedTexts, "clickedTexts");
  console.log(pic, "picccccc");

  // React.useEffect(() => {
  //   // Add event listener to the document
  //   document.addEventListener("click", handleClick);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  const raize = clickedTexts.map((element: any, index: any) => {
    return {
      img_url: pic[index],
      text: element,
      key: index,
    };
  });
  console.log(raize, "raize");

  console.log(textClick, screenshot, "ghghghgh");

  const length = clickedTexts?.length == pic?.length;
  // React.useEffect(() => {
  //   const imgText = clickedTexts.map((element: any, index: any) => {
  //     return {
  //       img: pic[index],
  //       text: element,
  //     };
  //   });
  //   localStorage.setItem("raize", JSON.stringify(imgText));
  // }, [length]);
  // React.useEffect(() => {
  //   const raize: any = localStorage.getItem("raize");
  //   setRaize(JSON.parse(raize));
  // }, [length]);

  var t0 = useRef<number>(-1);
  var t1 = useRef<number>(-1);

  const startScreenRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });
    setStreaming(stream);
    t0.current = performance.now();
    const recorder = new MediaRecorder(stream);
    setRecorder(recorder);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setChunks([...chunks, e.data]);
        screenRecordingChunks.push(e.data);
      }
    };
    recorder.onstop = async () => {
      recorder.stop();
      stream.getVideoTracks()[0].stop();
      const urlBlob = new File(screenRecordingChunks, "demo.mp4", {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(urlBlob);
      setVideoUrl(urlBlob);
      screenRecording.current.src = url;
      console.log(videoUrl, "videourlll");
    };

    recorder.start();
  };
  const Video = {
    startScreenRecording,
    Recorder,
    videoUrl,
    streaming,
    chunks,
    setVideoUrl,
    setStreaming,
    screenRecordingChunks,
    screenRecording,
  };

  let path = router.asPath.startsWith("/demo");

  const getTypeUser = (role: string) => {
    if (role?.startsWith("/company")) {
      return "company";
    } else if (role?.startsWith("/team")) {
      return "team";
    } else if (role?.startsWith("/member")) {
      return "member";
    } else {
      return "company";
    }
  };
  const getProfile = async () => {
    try {
      const apiRes = await henceforthApi.Auth.profile();
      setUserInfo(apiRes?.data);
      setUserType(getRoleForUrl(apiRes?.data?.role));
    } catch (error: any) {}
  };
  console.log(router, "routerrrrrrr");


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
          capitalizeFirstLetter,
          loginWithSocial,

          Toast,
          setUserInfo,
          userInfo,
          initLoginWithGoogle,
          stopSpaceEnter,
          raize,
          Video,
          setClickedTexts,
          setPic,
        } as any
      }
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? defaultAlgorithm : darkAlgorithm,
          token: {
            colorPrimary: colorPrimary,
            fontFamily: openSans.style.fontFamily,
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
              verticalLabelPadding: 0,
              labelColor: "#121212",
              itemMarginBottom: 16,
              labelHeight: 10,
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
              controlHeightLG: 0,
              controlHeight: 36,
              colorBgContainer: "transparent",
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              colorText: "#121212",
              paddingInlineLG: 20,
              fontWeightStrong: 400,
              colorFillTertiary: "#EDEDED",
            },

            Select: {
              lineWidth: 1,
              borderRadiusOuter: 40,
              borderRadius: 40,
              borderRadiusLG: 40,
              colorBorder: "transparent",
              colorText: "#828282",
              colorTextPlaceholder: "#828282",
              fontSize: 14,
              controlHeightLG: 40,
              controlHeight: 36,
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
              controlHeightLG: 40,
              controlHeight: 36,
              controlHeightSM: 34,
              borderColorDisabled: "transparent",
              colorBgContainerDisabled: "#fdc8467a",
              colorTextDisabled: "#fff",
              fontWeight: 500,
              defaultColor: "#000000",
              defaultBorderColor: "#000000",
              defaultBg: "transparent",
              colorErrorBg: "yellow",
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
              borderRadiusLG: 8,
              borderRadius: 8,
              colorBgElevated: "#000000",
              colorBorder: "#E5E5E5",
              colorFillAlter: "#000000",
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
