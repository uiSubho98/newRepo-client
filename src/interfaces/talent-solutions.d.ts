export interface ITestimonial {
    type: string
    designation?: string
    img_src?: string
    name?: string
    text?: string 
    desc?: string
}

export interface IFeatureList {
    imgSrc: string
    description: string
}

export interface IAchievement {
    label: string;
    value: string;
}

export interface IHeroContent {
    title: string;
    description: string;
    image: string;
    mob_image: string;
    achievements: Array<IAchievement>;
}

export interface IFeature {
    name: string;
    gist: string;
    image: string;
}

export interface IFeatures {
    title: string;
    list: Array<IFeature>;
}

export interface ITestimonial {
    type: string;
    img_src: string;
    name: string;
    designation: string;
    text: string;
    desc: string;
}

export interface IStep {
    id: number;
    alt: string;
    title: string;
    sub_title: string;
    description: string;
    img_src: string;
}

export interface IProcess {
    title: string;
    list: Array<IStep>;
}

export interface IProblem {
    statement: string;
    gist: string;
    logo: string;
}

export interface IProblems {
    title: string;
    list: Array<IProblem>
}


export interface IPartners {
    title: string;
    list: Array<string>;
}

export interface ITalentSolutions {
    hero_content: IHeroContent;
    features: IFeatures;
    testimonials: Array<ITestimonial>;
    process: IProcess;
    // problems: IProblems;
}