
export interface IHeroContent {
    title: string;
    image: string;
    mob_image: string;
}

export interface IWorkshopTimes {
    startTime: number;
    endTime: number;
}

export interface IWorkshop {
    workshopKey: string;
    workshopID: string;
    subject: string;
    description: string;
    preview: string;
    organizerKey: string;
    organizerEmail: string;
    organizerName: string;
    inSession: boolean;
    status: number;
    numberOfRegistrants: number;
    registrationLimit: number;
    accountKey: string;
    workshopStatus: number;
    tag: string;
    slug: string;
    workshopTimes: Array<IWorkshopTimes>;
    workshopType: string;
    recordingLinks: Array<string>;
}

export interface IUpcoming {
    title: string;
    list: Array<IWorkshop>;
}

export interface IPast {
    title: string;
    list: Array<IWorkshop>; 
}

export interface IState {
    heroContent?: IHeroContent;
    upcoming?: IUpcoming;
    past?: IPast;
    active?: Array<IWorkshop>;
    isSearching: boolean;
    searchText: string
}