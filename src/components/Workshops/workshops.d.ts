interface IWorkshop {
    workshopKey: string;
    workshopType: string;
    heroContent: IHeroContent;
    price: number;
    learnings: ILearnings;
    teaser: {
        url: string;
        thumb: string;
    },
    speakers: {
        title: string;
        list: Array<ISpeaker>;
        bookingText?: string;
    },
    faqs: {
        title: string;
        list: Array<IFaq>;
    },
    workshopTimes: Array<IWorkshopTime>;
    workshopMode: number;
    testimonials?: {
        list: Array<ITestimonial>;
        title: string;
    };
    students?: {
        list: Array<IStudent>;
        subtitle: string;
        title: string;
    };
    rightForYou?: {
        list: Array<IRFY>;
        subtitle: string;
        title: string;
    };
    featuredIn?: {
        list: Array<string>;
        subtitle: string;
        title: string;
    };
    joinUrl?: string;
    registerBlock?: {
        bookingText: string
    },
    registrationsClosed: boolean,
    regFields?: any;
    regQuestions?: any;
}
export interface IHeroContent {
    breadcrumb: string;
    title: string;
    deliveryType: string;
    replayUrl?: string;
    replayThumb?: string;
    bgImage?: string;

    bookingText?: string;
    rating?: number;
    ratingCount?: string;
    subtitle?: string;
    videoThumb?: string;
    videoUrl?: string;
}
export interface ISpeaker {
    imgUrl: string;
    linkedin: string;
    name: string;
    role: string;
}
export interface ILearnings {
    title: string;
    desc: string;
    topicsHeading: string;
    topics: Array<string>;

    bookingText: string;
    list: Array<ILearning>;
    subtitle: string;
}
export interface IFaq {
    question: string;
    answer: string;
}

export interface IWorkshopTime {
    startTime: number;
    endTime: number;
}

export interface ITestimonial {
    author: string;
    quote: string;
    role: string;
}

export interface ILearning {
    desc: string;
    icon: string;
    title: string;
}

export interface IStudent {
    imgUrl: string;
    name: string;
    progress: string;
}

export interface IRFY {
    desc: string;
    title: string;
}