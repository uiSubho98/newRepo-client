
export interface IHeroContent {
    heading: String;
    sub_heading: String;
    image_src: String;
    close_date: String;
}

export interface IProcess {
    name: String;
    desc: String;
}

export interface IProgramDetails {
    name: String;
    desc: String;
}

export interface IProgramOverview {
    sub_heading: String;
    process: Array<IProcess>;
    program_details: Array<IProgramDetails>;
    disclaimer: String;
}

export interface ICompanyInfo {
    heading: String;
    summary: String;
    logo: String;
    disclaimer: String;
}

export interface IBanner {
    heading: String;
    info: String;
    disclaimer: String;
}

export interface IProgramInfo {
    hero_content: IHeroContent;
    program_overview: IProgramOverview;
    eligibility_criteria: Array<String>;
    company_info: ICompanyInfo;
    has_applied: boolean;
    banner: IBanner;
    status: Number;
}