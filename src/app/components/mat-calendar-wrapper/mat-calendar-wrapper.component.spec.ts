import {PortalModule} from '@angular/cdk/portal'
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatNativeDateModule} from '@angular/material/core';

import {MatCalendarWrapperComponent} from './mat-calendar-wrapper.component';

describe('MatCalendarWrapperComponent', () => {
    let component: MatCalendarWrapperComponent;
    let fixture: ComponentFixture<MatCalendarWrapperComponent>;

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                imports : [ MatNativeDateModule, PortalModule ],
                declarations : [ MatCalendarWrapperComponent ],
                schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
            })
            .compileComponents();

        fixture = TestBed.createComponent(MatCalendarWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => { expect(component).toBeTruthy(); });
});
