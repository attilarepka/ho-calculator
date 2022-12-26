import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';

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
    appService: any;

    @ViewChildren("calendarChild")
    calendarChild: QueryList<MatCalendarWrapperComponent>;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor() { this.appService = new AppService(); }

    ngAfterViewInit() {}

    reset = ():
        void => {
            this.appService.reset();
            this.notifyChildren();
        }

    notifyChildren = (): void => {
        this.calendarChild.forEach(
            (child) => child.updateDaysMap(this.appService.getDaysMap()));
    };

    loadPayload = async(payload: any): Promise<void> => {
        this.reset();

        await this.appService.load(payload);

        this.notifyChildren();

        this.fileInput.nativeElement.value = null;
    };

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
