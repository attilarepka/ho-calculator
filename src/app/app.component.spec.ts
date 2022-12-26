import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatCard} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCalendar} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {
    MatCalendarWrapperComponent
} from './components/mat-calendar-wrapper/mat-calendar-wrapper.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports : [
                    FormsModule, MatNativeDateModule, MatInputModule,
                    BrowserAnimationsModule
                ],
                declarations : [
                    AppComponent, MatButtonToggleGroup, MatIcon, MatCard,
                    MatCalendarWrapperComponent, MatCalendar, MatFormField,
                    MatLabel, MatHint
                ],
                schemas : [ CUSTOM_ELEMENTS_SCHEMA ]

            })
            .compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'ho-calculator'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('ho-calculator');
    });

    it('should render all 12 calendarChild elements', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.getElementsByTagName('app-mat-calendar-wrapper').length)
            .toBe(12);
    });
});
