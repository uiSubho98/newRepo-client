export interface IPaymentOption {
    type: string;
    title?: string;
    actualPrice?: string;
    sellingPrice: string;
    symbol: string;
    name?: string;
    desc?: string;
    discountText?: string;
    termIds?: Array<string>;
    subDesc?: string;
}