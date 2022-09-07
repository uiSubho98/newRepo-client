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

export interface IProgram {
    logo: string;
    name: string;
    gist: string;
    slug: string;
    status: number;
}

export interface IPrograms {
    title: string;
    list: Array<IProgram>;
}