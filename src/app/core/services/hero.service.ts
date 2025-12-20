import { Injectable } from "@angular/core";
import { HeroTab } from "../../shared/models/hero.model";
import { Observable, of } from "rxjs";

const MOCK_HERO_TABS: Array<HeroTab> = [
    {
        id: 1,
        label: 'Welcome',
        heroData: {
            title: 'Example shop for my resume',
            subtitle: 'made with Angular 21',
            author: 'by Tamás Urbán',
            data: [],
        }
    },
    {
        id: 2,
        label: 'About the project',
        heroData: {
            title: 'About the project',
            subtitle: 'Objectives',
            author: '',
            data: [
                'apply modern frontend development best practices',
                'create a structured, maintainable codebase',
                'demonstrate component-based architecture',
                'ensure clear data flow and predictable state management',
                'provide a responsive and user-friendly interface',
            ],
        }
    },
    {
        id: 3,
        label: 'Details',
        heroData: {
            title: 'Key features ',
            subtitle: 'Used technologies',
            author: '',
            data: [
                'majd ide'
            ],
        }
    }
];

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    getHeroTabs() {
        return of(MOCK_HERO_TABS);
    }
}
