import henceforthApi, { BUCKET_ROOT } from "@/utils/henceforthApi";
import { Text, View, Link, StyleSheet, Font, Image } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { Fragment } from "react";
// import { OrderDetails } from 'src/interfaces/Products';

Font.register({
  family: "bold",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
  fontWeight: "bold",
});

Font.register({
  family: "italic",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-mediumitalic-webfont.ttf",
});
Font.register({
  family: "italic-regular",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});

Font.register({
  family: "medium",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});

// Create styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // flexGrow: 1,
  },
  w_20: {
    width: "20%",
  },
  w_30: {
    width: "30%",
  },
});
const InvoiceDetail = (props: any) => {
  return (
    <>
      <View style={styles.container}>
        {props?.type == "AUDIO" && <Fragment>
            <Text style={{ fontFamily: "medium", marginTop: "10px" }}>
          Video:
        </Text>
        <Link
          style={{ fontFamily: "medium", marginTop: "5px" }}
        >{`${BUCKET_ROOT}/audio/${props?.media_url}`}</Link>
            </Fragment>}
        {props?.type == "VIDEO" && <Fragment>
            <Text style={{ fontFamily: "medium", marginTop: "10px" }}>
          Video:
        </Text>
        <Link
          style={{ fontFamily: "medium", marginTop: "5px" }}
        >{`${BUCKET_ROOT}/video/${props?.media_url}`}</Link>
            </Fragment>}
        <Text style={{ fontFamily: "medium", marginTop: "20px" }}>
          Flowchart:
        </Text>
        <Link
          style={{ fontFamily: "medium", marginTop: "5px" }}
        >{`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.flowchart_image}`}</Link>
        <Image style={{ objectFit:"cover",height:100, width:100  }} src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.flowchart_image}`}></Image>
        <Text style={{ fontFamily: "medium", marginTop: "20px" }}>
          RACI:
        </Text>
        <Link
          style={{ fontFamily: "medium", marginTop: "5px" }}
        >{`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.raci_image}`}</Link>
        <Image style={{ objectFit:"cover",height:100, width:100  }} src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${props?.raci_image}`}></Image>
        <Text  style={{ fontFamily: "medium", marginTop: "20px" }}>
          PDF:
        </Text>
        <Link
          style={{ fontFamily: "medium", marginTop: "5px" }}
        >{`${henceforthApi.API_FILE_ROOT_DOCUMENTS}${props?.pdf_file}`}</Link>
      </View>
      {/* <View
        style={{ borderBottom: "1px solid #000", margin: "0px 0 10px" }}
      ></View> */}
    </>
  );
};

export default InvoiceDetail;
