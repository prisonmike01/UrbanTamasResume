interface HeroData {
    title: string;
    subtitle: string;
    author: string,
    data: string[];
}

export interface HeroTab {
    id: number;
    label: string;
    heroData: HeroData;
}