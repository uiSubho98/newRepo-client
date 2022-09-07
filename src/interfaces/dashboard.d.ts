interface IStep {
    id: number;
    title: string;
    info: string;
    link: string;
    action: string;
}

interface ITestimonial {
    statement: String,
    name: String,
    class: String,
    image: String
}

interface ITerm {
    id: number;
    name: String;
    topic: String;
    program: String;
    programId: String;
}

interface ICurriculumBlock {
    terms: Array<ITerm>
}

interface IEnrolBlock {
    title: string;
    description: string;
    testimonials: Array<ITestimonial>;
}

interface IMilestoneBlock {
    title: string;
    description: string;
    steps: Array<IStep>;
}


interface IContent {
    curriculumBlock: ICurriculumBlock;
    enrolBlock: IEnrolBlock;
    milestoneBlock: IMilestoneBlock;
}

interface IOngoing {
    completion: number;
    id: number;
    name: string;
    program: string;
    programId: string;
    programFop?: string;
    programFopId?: string;
    topic: string;
}

interface IBadge {
    id: number;
    name: string;
    image: string;
    description: string;
    action: string;
}

interface ICertificate {
    term: string;
    termId: string;
    slug: string;
    milestone_name: string;
    download_status: number;
    view_status?: number;
}

interface IProgress {
    points: number;
    starCount: number;
    certificates: Array<ICertificate>;
    earnedBadges: Array<IBadge>;
    earnableBadges: Array<IBadge>;
    ongoing: IOngoing;
    isTrialActivated?: boolean;
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
    [certificate: string]: string;
    [report: string]: string;
    [project: string]: string;
    [view_status:number]: number;
}

export interface IState {
    activeTab: number;
    content?: IContent;
    hasPurchased?: boolean;
    purchaseStatus?: number;
    hasStartedLearning?: boolean;
    isLoading: boolean;
    isPopoverVisible: boolean;
    liveclassInfo?: any;
    progress?: IProgress;
    workshopInfo?: IWorkshopInfo;
    workshopSources?: IWorkshopSources;
}