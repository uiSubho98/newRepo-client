interface IListItem {
    title: string;
    info: string | Array<string>;
}

interface IPlan {
    duration: string;
    title: string;
    topic: string;
    topics: Array<string>;
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

interface IVideoTestimonial {
    type: string;
    src: string;
    imgSrc: string;
}

interface IWrittenTestimonial {
    type: string;
    imgSrc: string;
    name: string;
    class: string;
    text: string;
    reviewIcon: string;
    reviewLink: string;
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
    actualPrice: any;
    sellingPrice: any;
    nextBatch: number;
    batchStartText: Text;
}

interface IOverview {
    title: string;
    list: Array<IListItem>;
}

interface ITechnologies {
    list: Array<string>;
    info: string;
}

interface ISprint {
    title: string;
    topic: string;
    duration?: number;
    projects?: number;
    labs?: number;
    plan?: Array<any>;
    certificate?: string;
}

interface IFeature {
    alt?: string;
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

interface IReviews {
    title: string;
    wrapperHeight1920: string;
    wrapperHeight1600: string;
    wrapperHeight1440: string;
    wrapperHeight1366: string;
    wrapperHeight1024: string;
    testimonials: Array<IVideoTestimonial | IWrittenTestimonial>;
}

interface ICareerServices {
    title: string;
    stat: Array<stat>;
    extra: string;
    learnMoreLink: string;
    prograds: Array<string>;
}

interface IFaqs {
    title: string;
    data: Array<IData>;
}

interface ICountryData {
    country_name: string;
}

export interface IState {
    status: number;
    heroContent?: IHeroContent;
    overview?: IOverview;
    technologies?: ITechnologies;
    curriculum?: ICurriculum;
    testimonial?: ITestimonial;
    features?: IFeatures;
    consequences?: IConsequences;
    outcomes?: IOutcomes;
    collaborators?: ICollaborators;
    reviews?: IReviews;
    careerServices?: any;
    faqs?: IFaqs;
    hasPurchased?: boolean;
    countryData: ICountryData;
}