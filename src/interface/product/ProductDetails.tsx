export interface ProductDetails {
    id: number;
    name: string;
    sku: string;
    barcode: string;
    barcode_image: string;
    quantity: number | null;
    price: string;
    customer_buying_price: string;
    weight: number | null;
    dimension_l: number | null;
    dimension_w: number | null;
    dimension_d: number | null;
    thumb: string;
    sgst_tax: number;
    igst_tax: number;
    feature_image: string;
    image_1: string;
    image_2: string;
    tag_3: string;
    tag_2: string;
    tag_1: string;
    notes: string;
    desc: string;
    is_variant: number;
    status: string;
    available_for: string;
    category_id: number;
    brand_id: number;
    manufacturer_id: number | null;
    weight_unit_id: number | null;
    measurement_unit_id: number;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
    tax_status: string;
    custom_tax: number | null;
    stock: number;
    split_sale: number | null;
    stock_alert_quantity: number;
    thumb_url: string;
  }
  