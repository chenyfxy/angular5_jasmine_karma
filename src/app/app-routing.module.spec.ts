import { Router, Routes, RouterLinkWithHref } from '@angular/router';
import { TestBed, fakeAsync, tick, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonComponent } from './person/person.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './admin/user/user.component';
import { EmailComponent } from './admin/email/email.component';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Type } from '@angular/core';
import { AppModule } from './app.module';
import { SpyLocation } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('Router: App', () => {
    // tslint:disable-next-line:prefer-const
    let comp: AppComponent;
    // tslint:disable-next-line:prefer-const
    let fixture: ComponentFixture<AppComponent>;
    let page: Page;
    // tslint:disable-next-line:prefer-const
    let router: Router;
    // tslint:disable-next-line:prefer-const
    let location: SpyLocation;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule]
        }).compileComponents();
    }));

    it('fakeAsync works', fakeAsync(() => {
        const promise = new Promise((resolve) => {
            setTimeout(resolve, 10);
        });
        let done = false;

        promise.then(() => done = true);
        tick(50);

        expect(done).toBeTruthy();
    }));

    it('should navigate to "Person" immediately', fakeAsync(() => {
        createComponent();
        router.navigate(['/person']);

        tick();
        expectPathToBe('/person');
        expectElementOf(PersonComponent);
    }));

    it('should navigate to "Order" on click', fakeAsync(() => {
        createComponent();
        click(page.oderLinkDe);

        advance();
        expectPathToBe('/order');
        expectElementOf(OrderComponent);
    }));

    it('should navigate to "admin/user" w/ browser location URL change', fakeAsync(() => {
        createComponent();
        location.simulateHashChange('/admin/user');
        advance();
        expectPathToBe('/admin/user');
        expectElementOf(UserComponent);
    }));

    it('should navigate to "Email" on click', fakeAsync(() => {
        createComponent();
        page.emailLinkDe.nativeElement.click();
        advance();
        expectPathToBe('/admin/email');
        expectElementOf(EmailComponent);
    }));

    ////// Helpers /////////
    /**
     * Advance to the routed page
     * Wait a tick, then detect changes, and tick again
     */
    function advance(): void {
        tick(); // wait while navigating
        fixture.detectChanges(); // update view
        tick(); // wait for async data to arrive
    }

    function createComponent() {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;

        const injector = fixture.debugElement.injector;
        location = injector.get(Location) as SpyLocation;

        router = injector.get(Router);
        router.initialNavigation();
        advance();

        page = new Page();
    }

    class Page {
        personLinkDe: DebugElement;
        oderLinkDe: DebugElement;
        userLinkDe: DebugElement;
        emailLinkDe: DebugElement;

        // for debugging
        comp: AppComponent;
        router: Router;
        fixture: ComponentFixture<AppComponent>;

        constructor() {
            const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

            this.personLinkDe = links[0];
            this.oderLinkDe = links[1];
            this.userLinkDe = links[2];
            this.emailLinkDe = links[3];

            // for debugging
            this.comp = comp;
            this.fixture = fixture;
            this.router = router;
        }
    }
    function expectPathToBe(path: string, expectationFailOutput?: any) {
        expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
    }

    function expectElementOf(type: Type<any>): any {
        const el = fixture.debugElement.query(By.directive(type));
        expect(el).toBeTruthy('expected an element for ' + type.name);
        return el;
    }
});

////// Helpers /////////
// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
    left: { button: 0 },
    right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}
