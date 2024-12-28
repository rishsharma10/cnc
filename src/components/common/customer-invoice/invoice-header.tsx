import henceforthApi from '@/utils/henceforthApi';
import { Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
// import { OrderDetails } from 'src/interfaces/Products';

Font.register({
    family: 'bold',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
    fontWeight: 'bold'
});

Font.register({
    family: 'italic',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});
Font.register({
    family: 'italic-regular',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});


// Create styles
const styles = StyleSheet.create({
    titleContainer: {
        marginBottom: 30,
    },
    reportTitle: {
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'bold'
    },
    container: {
        textAlign: 'center',
    },
    font10: {
        fontSize: 10,
        color: '#000'
    }
});

const InvoiceHeader = (props: any) => {

    function removeHTMLTags(htmlContent:string) {
        // Create a new DOM element
        const tempDiv = document.createElement("div");
        
        // Set the HTML content to the element
        tempDiv.innerHTML = htmlContent;
        
        // Retrieve the text content, which strips out the HTML tags
        return tempDiv.textContent || tempDiv.innerText || "";
      }
      const plainTextContent = removeHTMLTags(props?.description_doc);
    console.log(props)
    return (
        <>
            {/* Title  */}
            <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>{props?.title}</Text>
            </View>
            <View style={styles.container}>
            <Text style={{ fontFamily: 'italic' }}>{props?.description}</Text>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '15px 0 10px' }}></View>
            <View style={styles.titleContainer}>
                <Text style={styles.reportTitle}>Document</Text>
            </View>
            <View style={styles.container}>
            {/* <div style={{ fontFamily: 'italic' }} dangerouslySetInnerHTML={{__html:props?.description_doc}}></div> */}
            <Text style={{ fontFamily: 'italic' }} >{plainTextContent}</Text>
            {/* <Text  style={{ fontFamily: "medium", marginTop: "20px" }}>
          View Document
        </Text> */}
        <Link
          style={{ fontFamily: "medium", marginTop: "5px" }}
        >{`${henceforthApi.API_FILE_ROOT_DOCUMENTS}${props?.pdf_file}`}</Link>
            </View>
            <View style={{ borderBottom: '1px solid #000', margin: '15px 0 10px' }}></View>
        </>
    )
}

export default InvoiceHeader;