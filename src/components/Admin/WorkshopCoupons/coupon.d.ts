export interface ICoupon {
    coupon_id: number,
    coupon_code: string,
    discount: string,
    times_used: number,
    reuse_limit: number,
    start_date: Moment,
    expiry_date: Moment
}