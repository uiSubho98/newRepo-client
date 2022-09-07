export interface IDecodedToken {
    uid?: number;
    name?: string;
    email?: string
    subscriptions: {
        microdegree: boolean
        bootcamp: boolean
        mdRegTime: number
    }
}

export interface IStep {
    title?: string;
    description?: string;
    action?: string
    link?: string
    altAction?: string
    altActionLink?: string
    groupName?: string;
    discordRole?: string;
    info?: string;
}

export interface IProjectContent {
    title?: string;
    topic?: string;
    duration?: string;
    mode?: string;
    totalProjects?: string;
    projects?: Array<string>;
}

export interface IPrerequisites {
    steps?: Array<IStep>;
    projectContent?: IProjectContent;
}

export interface IBannerContent {
    title?: string;
    subTitle?: string;
    description?: string | Array;
}

export interface IContent {
    title?: string;
    description?: string;
    preRequisites?: IPrerequisites;
    bannerContent?: IBannerContent;
    freeWorkshopLink?: string
}

export interface IOnboarding {
    attendFreeWorkshop: boolean
    freeTermCompleted: boolean
    freeWorkshopDate: number
    discordInviteUsed: boolean
    slot?: string
}

export interface IProgress {
    ongoing?: ISprint;
    next?: ISprint;
    nextStep?: INextStep;
    starCount : number
    xp : number
    activeMilestone : string
    termsCompleted : Array<>
    coursesCompleted : Array<>
    certificates : Array<>
}

export interface IOnboardStatus {
    slotsSelected?: boolean;
    discordInviteUsed?: boolean;
    projectsCompleted?: boolean;
    slot?: string;
}

interface IDetails {
    slot_ts: number;
    slot_id: string;
    att: string;
}

interface IWorkshopInfo {
    att: string;
    details: IDetails | null;
}

interface IWorkshopSources {
    certificate?: string;
    report?: string;
    project?: string;
    view_status?: number;
}

export interface IHero {
    decodedToken: IDecodedToken;
    data?: IContent;
    onboarding: IOnboarding;
    discordId?: string;
    progress?: IProgress;
    onboardStatus?: IOnboardStatus;
    purchase?: object;
    workshopInfo?: IWorkshopInfo;
    workshopSources?: IWorkshopSources;
    hasStartedLearning?: boolean;
    liveclassInfo?: any;
}

export interface ICountryData {
    city?: string
    countryCode?: string
    countryName?: string
}

export interface INextStep {
    moduleId: string;
    moduleName: string;
    child: {
        programSlug: string
        moduleId: string;
        moduleName: string;
    }
}

export interface IUserProgress {
    uid: number
    onboarding: IOnboarding
    progress : IProgress
    bootcampOnboarding : IBootcampOnboarding,
}

export interface IBootcampOnboarding {
    slotsSelected : Boolean
    discordInviteUsed : Boolean
    projectsCompleted : Boolean
}

export interface ISprint {
    course : number
    term : string
    termName : string
}