import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
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
    daysSelected: any[] = [];
    event: any;
    calendarStartAt: Date;

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        const date = new Date('2023');
        date.setMonth(this.startMonth);
        this.calendarStartAt = date;
    }

    isSelected = (event: any) => {
        const date = event.getFullYear() + '-' +
                     ('00' + (event.getMonth() + 1)).slice(-2) + '-' +
                     ('00' + event.getDate()).slice(-2);
        return this.daysSelected.find((x) => x == date) ? 'selected'
                                                        : (null as any);
    };

    select(event: any, calendar: any) {
        const date = event.getFullYear() + '-' +
                     ('00' + (event.getMonth() + 1)).slice(-2) + '-' +
                     ('00' + event.getDate()).slice(-2);
        const index = this.daysSelected.findIndex((x) => x == date);
        if (index < 0)
            this.daysSelected.push(date);
        else
            this.daysSelected.splice(index, 1);

        calendar.updateTodaysDate();
    }

    holidayFilter = (now: Date):
        boolean => {
            // TODO:
            // make API call
            // filter to date
            const holiday =
                Array(new Date('2023-08-16'), new Date('2023-08-23'));
            return !holiday.some((e) => now.getFullYear() === e.getFullYear() &&
                                        now.getMonth() === e.getMonth() &&
                                        now.getDate() === e.getDate());
        }

    weekendsDatesFilter = (d: Date): boolean => {
        const day = d.getDay();
        const SATURDAY = 0;
        const SUNDAY = 6;

        return day !== SATURDAY && day !== SUNDAY && this.holidayFilter(d);
    };
}
