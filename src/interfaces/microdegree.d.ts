interface IListItem {
    title: string;
    info: string | Array<string>;
}

interface IPlan {
    duration: string;
    title: string;
    topics: Array<string>;
    type: string;
    countryName: any;
}

interface IPros {
    image: string;
    info: string;
}

interface IResume {
    before: string;
    after: string;
    description: string;
}

interface IProject {
    image: string;
    name: string;
    technologies: string;
}

interface IDetails {
    sp: number;
    symbol: string;
}

interface IDiscount {
    [countryName: string]: IDetails;
}

interface IActualPrice {
    [countryName: string]: IDetails;
}

interface ISellingPrice {
    [countryName: string]: IDetails;
}

interface IEmi {
    [countryName: string]: IDetails;
}

interface IPlan {
    name: string;
    discount?: any;
    actualPrice?: any;
    sellingPrice: any;
    emi: IEmi;
    description: string;
}

interface IFaq {
    question: string;
    answer: string;
}

interface IData {
    topic: string;
    content: Array<IFaq>;
}

interface IHeroContent {
    title: string;
    description: string;
    image: string;
    mob_image: string;
    actualPrice: string;
    sellingPrice: string;
}

interface IInsight {
    data: string;
    info: string;
}

interface IOverview {
    title: string;
    list: Array<IListItem>;
}

interface ISprint {
    title: string;
    topic: string;
    duration: number;
    projects: number;
    labs: number;
    plan: Array<IPlan>;
}

interface IFeature {
    title: string;
    video: string;
}

interface ICurriculum {
    title: string;
    sprints: Array<ISprint>;
    brochureLink: string;
}

interface ITestimonial {
    imgSrc: string;
    text: string;
    author: string;
    authorClass: string;
}

interface IFeatures {
    title: string;
    list: Array<IFeature>;
}

interface IConsequences {
    title: string;
    pros: Array<IPros>;
    resume: IResume;
}

interface IOutcomes {
    title: string;
    projects: Array<IProject>;
}

interface ICollaborators {
    backgroundSrc: string;
    title: string;
    list: Array<string>;
}

interface IBenefits {
    title: string;
    image: string;
    list: Array<string>;
}

interface ICareerServices {
    title: string;
    stat: Array<stat>;
    extra: string;
    learnMoreLink: string;
    prograds: Array<string>;
}

interface IPlans {
    title: string;
    nextBatch: number;
    list: Array<IPlan>;
}

interface IFaqs {
    title: string;
    data: Array<IData>;
}

interface ICountryData {
    country_name: string;
}

export interface IState {
    heroContent?: IHeroContent;
    insights?: Array<IInsight>;
    overview?: IOverview;
    curriculum?: ICurriculum;
    testimonial?: ITestimonial;
    features?: IFeatures;
    consequences?: IConsequences;
    testimonial_alt?: ITestimonial
    outcomes?: IOutcomes;
    collaborators?: ICollaborators;
    benefits?: IBenefits;
    careerServices?: any;
    plans?: IPlans;
    faqs?: IFaqs;
    hasPurchased?: boolean;
    countryData: ICountryData;
}