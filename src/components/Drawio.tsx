import henceforthApi from "@/utils/henceforthApi";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useRef, useState } from "react";
import { DrawIoEmbed, DrawIoEmbedRef } from "react-drawio";
// import 'react-drawio/dist/index.css';
import { GlobalContext } from "@/context/Provider";

// const DrawIoEmbed = dynamic(() => import('react-drawio' as any), { ssr: false });
const DrawioCommon = (props: any) => {
  console.log(props, "propspspspsppspp");
  const {userType}=useContext(GlobalContext)

  const [imgData, setImgData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [xmlcontent, setXmlContent] = useState(null as any);
  const router = useRouter();
  const drawioRef = useRef<DrawIoEmbedRef>(null);
  // const exportDiagram = () => {
  //   if (drawioRef.current) {
  //     drawioRef.current.exportDiagram({
  //       format: "xmlsvg",
  //     });
  //   }
  // };
  let Content: any;
  if (props?.state?.is_flow_chart_update) {
    Content = `${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.state?.flowchart_image}`;
  } else {
    Content = `${henceforthApi.API_FILE_ROOT_DOCS}${props?.state?.flow_chart_diagram_file}`;
  }
  console.log(Content, "ContentContentContent");

  const onSave = async (data: any) => {
    let payload = {
      base64String: data?.data,
    };
    try {
      const apiRes = await henceforthApi.Process.flowChartUpdate(
        router.query.process_id as string,
        payload
      );
      console.log(apiRes);
      router.push(`/${userType}/process/${router.query.process_id}/details`);
    } catch (error) {}
  };
  const fetchXML = async () => {
    debugger
    try {
      setLoading(true)
      const response = await fetch(Content, {
        method: "GET",
        headers: {
          "Content-Type": "application/xml",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const text = await response.text();
      setXmlContent(text);
    } catch (error: any) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchXML();
  }, [Content]);

  return (
    <Fragment>
      {loading ? <div className="text-center">
        Loading...
      </div> : <>
        <div style={{ width: "100%", height: "100%", marginTop: "20px" }}>
          <DrawIoEmbed
            ref={drawioRef}
            xml={xmlcontent}
            onExport={(data) => {
              onSave(data);
            }}
          />
          {/* <Drawio
        xml={"xmlContent"}
        diagramName="My Diagram"
        style={{ height: '500px', width: '100%' }}
      /> */}
        </div>

        {imgData && (
          <img
            src={imgData}
            alt="Exported diagram"
            style={{ maxWidth: "100%", marginTop: "20px" }}
          />
        )}
      </>}

    </Fragment>
  );
};
export default DrawioCommon;
