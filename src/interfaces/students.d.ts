export interface IAchievement {
    label: string;
    value: string;
}

export interface IHeroContent {
    title: string;
    description: string;
    image: string;
    mob_image: string;
    achievements: Array<IAchievement>
}

export interface IProgram {
    logo: string;
    name: string;
    gist: string;
    slug: string;
    application_status: number;
    status: number;
    o_id: string;
    role_id:string;
}

export interface IPrograms {
    title: string;
    list: Array<IProgram>
}

export interface IFeature {
    title: string;
    video: string;
}

export interface IFeatures {
    title: string;
    list: Array<IFeature>;
}

export interface IPros {
    image: string;
    info: string;
}

export interface IResume {
    before: string;
    after: string;
    description: string;
}

export interface IConsequences {
    title: string;
    pros: Array<IPros>;
    resume: IResume;
}

export interface IContent {
    hero_content: IHeroContent;
    programs: IPrograms;
    features: IFeatures;
    consequences: IConsequences
}