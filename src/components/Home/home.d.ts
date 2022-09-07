export interface ITestimonial {
    type: string
    src?: string
    imgSrc?: string
    name?: string
    class?: string
    text?: string 
    reviewIcon?: string
    reviewLink?: string
}

export interface ISubProgram {
    title: string;
    desc: string; 
    learnMoreLink: string;
}

export interface IProgram {
    name: string;
    type: string;
    description: string;
    learnMoreLink: string;
    subPrograms?: Array<ISubProgram>
}

export interface IProgramV3 {
    description: string;
    label: string;
    name: string;
    slug: string;
}