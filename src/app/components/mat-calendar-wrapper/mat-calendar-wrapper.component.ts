import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector : 'app-mat-calendar-wrapper',
    templateUrl : './mat-calendar-wrapper.component.html',
    styleUrls : [ './mat-calendar-wrapper.component.css' ],
    encapsulation : ViewEncapsulation.None
})
export class MatCalendarWrapperComponent implements OnInit {
    daysSelected: any[] = [];
    event: any;
    calendarStartAt: Date;

    constructor() { this.calendarStartAt = new Date(); }

    ngOnInit() { this.calendarStartAt = new Date('2023-01-01'); }

    isSelected = (event: any) => {
        const date = event.getFullYear() + '-' +
                     ('00' + (event.getMonth() + 1)).slice(-2) + '-' +
                     ('00' + event.getDate()).slice(-2);
        return this.daysSelected.find((x) => x == date) ? 'selected'
                                                        : null as any;
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

    weekendsDatesFilter = (d: Date): boolean => {
        const day = d.getDay();
        const SATURDAY = 0;
        const SUNDAY = 6;

        return day !== SATURDAY && day !== SUNDAY;
    };
}
