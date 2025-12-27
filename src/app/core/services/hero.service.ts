// Angular
import { Injectable } from "@angular/core";
import { of } from "rxjs";

// App
import { HeroTab } from "../../shared/models/hero.model";

const MOCK_HERO_TABS: Array<HeroTab> = [
    {
        id: 1,
        label: 'Welcome',
        heroData: {
            title: 'Example shop for my resume',
            subtitle: 'made with Angular 21 and Material Design 3',
            author: 'by Tamás Urbán',
            data: [],
        }
    },
    {
        id: 2,
        label: 'About the project',
        heroData: {
            title: 'About the project',
            subtitle: 'Main objectives',
            author: '',
            data: [
                'apply modern best practices',
                'create a structured codebase',
                'provide a mobile-first interface',
            ],
        }
    },
    {
        id: 3,
        label: 'Details',
        heroData: {
            title: 'Key features',
            subtitle: 'Used technologies',
            author: '',
            data: [
                'standalone components (+ lifecyle hooks), SCSS 7-1 pattern',
                'signal(), computed(), effect() and input(), output() bindings',
                '@if, @for, @empty structural directives',
                'dependency injection with inject(), RxJS interop with toSignal()',
                'signal forms',
                'guarded routes, router events, resolvers',
                'usage of lazy loading and @defer',
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
