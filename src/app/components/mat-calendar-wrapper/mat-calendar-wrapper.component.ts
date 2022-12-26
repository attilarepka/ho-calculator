import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector : 'app-mat-calendar-wrapper',
    templateUrl : './mat-calendar-wrapper.component.html',
    styleUrls : [ './mat-calendar-wrapper.component.css' ],
    encapsulation : ViewEncapsulation.None,
    changeDetection : ChangeDetectionStrategy.OnPush,
})
export class MatCalendarWrapperComponent implements OnChanges {
    @Input() startMonth: number;
    @Input() selectionType: string;
    @Input() isHomeOfficeAllowed: boolean;
    @Input() isAnnualLeaveAllowed: boolean;
    @Input() startYearDate: number;
    @Input() publicHolidays: Array<any>;
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    daysMap: Map<string, string> = new Map<string, string>();
    event: any;
    calendarStartDate: Date;

    @ViewChild('calendar') matCalendar: any;

    constructor() {}

    updateDaysMap = (payload: Map<string, string>): void => {
        const activeMonth = this.calendarStartDate.getMonth();
        this.daysMap.clear();
        payload.forEach((value, key) => {
            if (new Date(key).getMonth() === activeMonth)
                this.daysMap.set(key, value);
        });

        this.matCalendar.updateTodaysDate();
        this.matCalendar._goToDateInView(this.calendarStartDate, 'month');
    };

    updateCalendarStartDate = (): void => {
        const currentDate = new Date(this.startYearDate, 0);
        currentDate.setMonth(this.startMonth);
        this.calendarStartDate = currentDate;
    };

    updatePublicHolidays =
        (holidays: Array<any>): void => { this.publicHolidays = holidays; };

    ngOnChanges(changes: SimpleChanges) {}

    isSelected = (event: any) => {
        const date = event.getFullYear() + '-' +
                     ('00' + (event.getMonth() + 1)).slice(-2) + '-' +
                     ('00' + event.getDate()).slice(-2);
        const item = this.daysMap.has(date);
        return item ? this.daysMap.get(date) : (null as any);
    };

    select = (event: any, calendar: any): void => {
        const date = event.getFullYear() + '-' +
                     ('00' + (event.getMonth() + 1)).slice(-2) + '-' +
                     ('00' + event.getDate()).slice(-2);
        if (this.daysMap.get(date) == this.selectionType) {
            this.daysMap.delete(date);
            calendar.updateTodaysDate();
            this.notifyParent.emit({key : date, value : this.selectionType});
        } else if ((this.isHomeOfficeAllowed &&
                    this.selectionType == 'homeoffice') ||
                   (this.isAnnualLeaveAllowed &&
                    this.selectionType == 'annual')) {
            this.daysMap.set(date, this.selectionType);
            calendar.updateTodaysDate();
            this.notifyParent.emit({key : date, value : this.selectionType});
        }
    };

    holidayFilter = (now: Date): boolean => {
        if (this.publicHolidays === undefined)
            return true;
        const nowOffset =
            new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
        const nowStr = nowOffset.toISOString().split('T')[0];

        return !this.publicHolidays.some((e: {date: string}) =>
                                             nowStr === e.date);
    };

    weekendsDatesFilter = (d: Date): boolean => {
        const day = d.getDay();
        const SATURDAY = 0;
        const SUNDAY = 6;

        return this.holidayFilter(d) && day !== SATURDAY && day !== SUNDAY;
    };
}
