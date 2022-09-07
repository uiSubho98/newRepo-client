export interface ITestimonial {
    batch: string
    LPA?: string
    imgSrc?: string
    name?: String
    companyImg?: string
}

export interface IFeatureList {
    title: string
    description: string
}

export interface IProgramOverviewList {
    title: string
    description: string
}

export interface IPhase1List {
    imgSrc: string
    description: string
}

export interface ICountryData {
    country_name: string;
    country_code: string;
    currency: string;
}

export interface IFee {
    [countryName: string]: {
        sp: number;
        symbol: string;
    }
}

export interface IFeeList {
    title: string
    fee: IFee;
    description: string
}

export interface IJoinList {
    title: string
    heading: string
    description: string
}

export interface IFaqs{
    title: string;
    data: Array<IData>;
}

export interface IOverview{
    title: string;
    list: Array<IListItem>;
}

interface IData {
    topic: string;
    content: Array<IFaq>;
}

interface IFaq {
    question: string;
    answer: string;
}

interface IListItem {
    title: string;
    info: string | Array<string>;
}