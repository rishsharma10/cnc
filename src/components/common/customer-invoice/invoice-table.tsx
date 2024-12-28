import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import { OrderDetails } from 'src/interfaces/Products';



Font.register({
    family: 'bold',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
    fontWeight: 'bold'
});

Font.register({
    family: 'italic',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-mediumitalic-webfont.ttf",
});
Font.register({
    family: 'italic-regular',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf",
});

Font.register({
    family: 'medium',
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
});


// Create styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    w_100: {
        width: '100%',
    },

});
const InvoiceTable = (props: any) => {
    return (
        <>
            {/* Table Heading  */}
            <View style={styles.container}>
                {/* 1  */}
                <View style={{ width: '18%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Product</Text>
                </View>
                {/* 2  */}
                <View style={{ width: '27%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Title</Text>
                </View>
                {/* 3  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Qty</Text>
                </View>
                {/* 4  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Gross</Text>
                    <Text style={{ fontFamily: 'bold' }}>Amount</Text>
                </View>
                {/* 5  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Discount</Text>
                    <Text style={{ fontFamily: 'bold' }}>/Coupons</Text>
                </View>
                {/* 6  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Taxable</Text>
                    <Text style={{ fontFamily: 'bold' }}>Value</Text>
                </View>
                {/* 7  */}
                <View style={{ width: '10%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Tax</Text>
                </View>
                {/* 8  */}
                <View style={{ width: '5%' }}>
                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>Total</Text>
                </View>
            </View>
            <View>
                {props?.order_products?.map((res: any, index: number) => {
                    return (
                        <>
                            <View style={styles.container}>
                                <View style={{ width: '18%' }}>
                                    <Text style={{ fontFamily: 'bold' }}>{index + 1}</Text>
                                </View>
                                {/* 2  */}
                                <View style={{ width: '27%' }}>
                                    <Text style={{ fontFamily: 'bold' }}>{res?.products?.name}</Text>
                                </View>
                                {/* 3  */}
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontFamily: 'bold' }}>{res?.quantity}</Text>
                                </View>
                                {/* 4  */}
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontFamily: 'bold' }}>{res?.total_price}</Text>
                                </View>
                                {/* 5  */}
                                <View style={{ width: '10%' }}>
                                    {/* <Text style={{ fontFamily: 'bold' }}>Discount</Text> */}
                                    <Text style={{ fontFamily: 'bold' }}>{res?.discount_price}</Text>
                                </View>
                                {/* 6  */}
                                <View style={{ width: '10%' }}>
                                    {/* <Text style={{ fontFamily: 'bold' }}></Text> */}
                                    <Text style={{ fontFamily: 'bold' }}>{0}</Text>
                                </View>
                                {/* 7  */}
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontFamily: 'bold' }}>{0}</Text>
                                </View>
                                {/* 8  */}
                                <View style={{ width: '5%' }}>
                                    <Text style={{ fontFamily: 'bold', textAlign: 'right' }}>{res?.total_price}</Text>
                                </View>
                            </View>
                            <View style={[styles.container, { margin: '10px 0' }]}>
                                <View style={{ width: '18%' }}></View>
                                <View style={{ width: '27%' }}>
                                    <Text style={{ fontFamily: 'bold' }}>Shipping And Convenience Charges</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Text style={{}}>{props?.payment_summary?.delivery_fee ? Number(props?.payment_summary?.delivery_fee).toFixed(2):"Free"}</Text>
                                </View>
                            </View>


                        </>
                    )
                })}
            </View>



            {/* <View style={{ borderBottom: '1px solid #000', margin: '10px 0 10px' }}></View> */}

            {/* Order Price  */}

            <View style={styles.container}>
                {/* 1  */}
                <View style={{ width: '18%' }}>
                    <Text>{props?.product_id?.subcategory?.name}</Text>
                    <Text>{props?.product_id?.prod_id}</Text>
                    {/* <Text>ACCSFDSDFBDSF</Text> */}
                    {/* <Text>HSN/SAC: 741268</Text> */}
                </View>
                {/* 2  */}
                <View style={{ width: '27%' }}>
                    {/* <Text style={{ fontFamily: 'bold' }}>{props?.product_id?.name} </Text> */}
                    {/* <Text style={{ fontFamily: 'bold', marginBottom: 4 }}>{props?.product_id?.brand_id?.name}</Text> */}
                    {/* {Array.isArray(props?.product_id?.services) && props?.product_id?.services?.map((res: any) => <Text key={res._id} style={{}}>{res?.content}</Text>)} */}
                    {/* <Text style={{}}>of Purchase</Text> */}
                    {/* <View style={[styles.container, { marginTop: 4 }]}>
                        <Text style={{ fontFamily: 'bold', marginRight: 3 }}>Tax:</Text>
                        <Text style={{}}>{props?.tax_percantage}%</Text>
                    </View> */}
                </View>
                {/* <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.quantity}</Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.total_price}</Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.coupon_discount ? -props?.coupon_discount : 0}</Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.total_price - props?.tax_amount}</Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text style={{}}>{props?.tax_amount?.toFixed(2)}</Text>
                </View>
                <View style={{ width: '5%' }}>
                    <Text style={{ textAlign: 'right' }}>{props?.total_price - props?.coupon_discount}</Text>
                </View> */}
            </View>

            {/* Shipping And Convenience Charges */}
            {/* <View style={[styles.container, { margin: '10px 0' }]}>
                <View style={{ width: '18%' }}></View>
                <View style={{ width: '27%' }}>
                    <Text style={{ fontFamily: 'bold' }}>Shipping And Convenience Charges</Text>
                </View>
                <View style={{ width: '10%' }}>
                    <Text style={{}}>Free</Text>
                </View>
            </View> */}



            <View style={{ borderBottom: '1px solid #000', margin: '5px 0 10px' }}></View>

            <View style={styles.container}>
                <Text style={{ width: '18%' }}></Text>
                <Text style={{ width: '27%', fontFamily: 'bold' }}>Total</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.order_products?.length}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.total_price.toFixed(4)}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{props?.coupon_discount}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{0}</Text>
                <Text style={{ width: '10%', fontFamily: 'bold' }}>{0}</Text>
                <Text style={{ width: '5%', fontFamily: 'bold', textAlign: 'right' }}>{(props?.total_price - props?.coupon_discount).toFixed(2)}</Text>
            </View>

            <View style={{ borderBottom: '1px solid #000', margin: '12px 0 12px' }}></View>
            <View style={[styles.container, {}]}>
                <View style={{ width: "75%" }}></View>
                <View style={{ width: "25%" }}>
                    <View style={[styles.container, {}]}>
                        <Text style={{ fontSize: 10, width: '50%', fontFamily: 'medium' }}>Grand Total</Text>
                        <Text style={{ fontSize: 10, width: '50%', textAlign: 'right', fontFamily: 'bold' }}>$ {(props?.total_price - props?.coupon_discount).toFixed(2)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={[styles.w_100, { textAlign: 'right', fontFamily: 'medium', marginTop: 5 }]}>{props?.seller_id?.company}</Text>
            </View>
        </>
    )
}








export default InvoiceTable;