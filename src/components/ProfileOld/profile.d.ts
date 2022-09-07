export interface ILanguage {
    name: string
    usage: number
    icon: string
}

export interface IProject {
    name: string
    isPinned: Boolean
    desc: string
    type: string
    previewLink?: string
    previewThumb?: string
}

export interface IProfile {
    firstName: string
    lastName: string
    website: string
    linkedinUrl: string
    githubUrl: string
    isWorking: boolean
    company: string
    designation: string
    college: string
    yop: string
    degree: string
    stream: string
    profilePic: string
    prefix?: string
    mobileNumber?: string
}

export interface IActivity {
    date: string
    logs: Array<string>
}

export interface IProfileStats {
    linesOfCode: number
    projects: number
    langs: 0
}

export interface ICertificate {
    name: string
    link: string
    previewUrl: string
}

export interface IBadge {
    earned: Array<{
        desc: string
        name: string
        src: string
    }>
    earnable: Array<{
        desc: string
        name: string
        src: string
    }>
}

export interface IProgram {
    name: string
    src: string
    img: string
}