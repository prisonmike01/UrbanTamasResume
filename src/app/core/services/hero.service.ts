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
                'apply best practices',
                'create a structured codebase',
                'demonstrate component-based architecture',
                'ensure clear data flow',
                'provide a responsive interface',
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
