import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
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
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    daysMap: Map<string, string> = new Map<string, string>();
    event: any;
    calendarStartAt: Date;

    constructor() {};

    updateDaysMap(payload: Map<string, string>) {
        const activeMonth = this.calendarStartAt.getMonth();
        console.log("callback: ", payload);
        this.daysMap.clear();
        payload.forEach((value, key) => {
            if (new Date(key).getMonth() === activeMonth)
                this.daysMap.set(key, value);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        const date = new Date('2023'); // TODO: set year
        date.setMonth(this.startMonth);
        this.calendarStartAt = date;
    };

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
        if (this.daysMap.get(date) == this.selectionType)
            this.daysMap.delete(date);
        else
            this.daysMap.set(date, this.selectionType);

        calendar.updateTodaysDate();

        this.notifyParent.emit({key : date, value : this.selectionType});
    };

    holidayFilter = (now: Date): boolean => {
        const holidayAPI = [
            {
                date : '2023-01-01',
                localName : 'Újév',
                name : "New Year's Day",
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-03-15',
                localName : 'Nemzeti ünnep',
                name : '1848 Revolution Memorial Day',
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-04-07',
                localName : 'Nagypéntek',
                name : 'Good Friday',
                countryCode : 'HU',
                fixed : false,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-04-09',
                localName : 'Húsvétvasárnap',
                name : 'Easter Sunday',
                countryCode : 'HU',
                fixed : false,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-04-10',
                localName : 'Húsvéthétfő',
                name : 'Easter Monday',
                countryCode : 'HU',
                fixed : false,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-05-01',
                localName : 'A munka ünnepe',
                name : 'Labour day',
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-05-28',
                localName : 'Pünkösdvasárnap',
                name : 'Pentecost',
                countryCode : 'HU',
                fixed : false,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-05-29',
                localName : 'Pünkösdhétfő',
                name : 'Whit Monday',
                countryCode : 'HU',
                fixed : false,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-08-20',
                localName : 'Az államalapítás ünnepe',
                name : 'State Foundation Day',
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-10-23',
                localName : 'Nemzeti ünnep',
                name : '1956 Revolution Memorial Day',
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-11-01',
                localName : 'Mindenszentek',
                name : 'All Saints Day',
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-12-25',
                localName : 'Karácsony',
                name : 'Christmas Day',
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
            {
                date : '2023-12-26',
                localName : 'Karácsony másnapja',
                name : "St. Stephen's Day",
                countryCode : 'HU',
                fixed : true,
                global : true,
                counties : null,
                launchYear : null,
                types : [ 'Public' ],
            },
        ];
        // TODO:
        // make API call

        const nowOffset =
            new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
        const nowStr = nowOffset.toISOString().split('T')[0];

        return !holidayAPI.some((e) => nowStr === e.date);
    };

    weekendsDatesFilter = (d: Date): boolean => {
        const day = d.getDay();
        const SATURDAY = 0;
        const SUNDAY = 6;

        return this.holidayFilter(d) && day !== SATURDAY && day !== SUNDAY;
    };
}
