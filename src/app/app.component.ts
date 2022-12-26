import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';

import {
    MatCalendarWrapperComponent
} from './components/mat-calendar-wrapper/mat-calendar-wrapper.component';
import {AppService} from './services/app.service';

@Component({
    selector : 'app-root',
    templateUrl : './app.component.html',
    styleUrls : [ './app.component.css' ],
})
export class AppComponent implements AfterViewInit {
    title = 'ho-calculator'; // can be removed
    selectedYear: number;

    @ViewChildren("calendarChild")
    calendarChild: QueryList<MatCalendarWrapperComponent>;

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('yearPicker', {static : false})
    private yearPicker!: MatDatepicker<Date>;

    constructor(public appService: AppService, private cdr: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.notifyChildYearChange();
        this.notifyChildren();
        this.cdr.detectChanges();
    }

    reset = ():
        void => {
            this.appService.reset();
            this.notifyChildren();
        }

    notifyChildren = (): void => {
        this.calendarChild.forEach(
            (child) => child.updateDaysMap(this.appService.getDaysMap()));
    };

    notifyChildYearChange = (): void => {
        this.calendarChild.forEach((child) => child.updateCalendarStartDate());
    };

    notifyChildPublicHolidayChange = (): void => {
        this.calendarChild.forEach((child) => child.updatePublicHolidays(
                                       this.appService.getPublicHolidays()));
    };

    generateCalendar = async(): Promise<void> => {
        await this.appService.setPublicHolidays();
        this.notifyChildYearChange();
        this.notifyChildPublicHolidayChange();
        this.notifyChildren();
    };

    loadPayload = async(payload: any): Promise<void> => {
        this.reset();

        await this.appService.load(payload);
        await this.appService.setPublicHolidays();

        this.notifyChildYearChange();
        this.notifyChildPublicHolidayChange();
        this.notifyChildren();

        this.fileInput.nativeElement.value = null;
    };

    onYearSelected = (ev: Date): void => {
        const yearSelected = ev.getFullYear();
        this.appService.setCurrentYear(yearSelected);
        this.yearPicker.close()
    };

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
