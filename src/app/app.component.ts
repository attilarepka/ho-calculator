import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

import {
    MatCalendarWrapperComponent
} from './components/mat-calendar-wrapper/mat-calendar-wrapper.component';
import {
    FileServiceComponent
} from './services/file-service/file-service.component';

interface Payload {
    homeOfficeLimit: number;
    annualLeaveLimit: number;
    daysMap: Map<string, string>;
    currentYear: number;
}

@Component({
    selector : 'app-root',
    templateUrl : './app.component.html',
    styleUrls : [ './app.component.css' ],
})
export class AppComponent implements AfterViewInit {
    payload: Payload;
    selectionType: string = "homeoffice";
    title = 'ho-calc';
    fileService: any;
    selectedFile: File;

    @ViewChildren("calendarChildren")
    calendarChildren: QueryList<MatCalendarWrapperComponent>;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor() {
        this.fileService = new FileServiceComponent(new FileSaverService);
        this.payload = {
            currentYear : 2023,
            homeOfficeLimit : 150,
            daysMap : new Map<string, string>,
            annualLeaveLimit : 0
        }
    }

    ngAfterViewInit() {}

    getNotification = (event: any):
        void => {
            const key = event.key;
            if (this.payload.daysMap.get(key) == this.selectionType)
                this.payload.daysMap.delete(key);
            else
                this.payload.daysMap.set(key, this.selectionType);
        }

    resetPayload = ():
        void => {
            this.payload.daysMap.clear();
            this.payload.annualLeaveLimit = 0;
            this.payload.homeOfficeLimit = 150;

            this.notifyChildren();
        }

    savePayload = ():
        void => {
            const payloadJSON = JSON.parse(JSON.stringify(this.payload));
            const array = Array.from(this.payload.daysMap,
                                     ([ date, type ]) => ({date, type}));
            payloadJSON.daysMap = array;
            this.fileService.onSave(JSON.stringify(payloadJSON));
        }

    notifyChildren = ():
        void => {
            this.calendarChildren.forEach(
                (child) => child.updateDaysMap(this.payload.daysMap));
        }

    loadPayload = (payload: any):
        void => {
            this.selectedFile = payload.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(this.selectedFile, "UTF-8");
            fileReader.onload = () => {
                const input = JSON.parse(fileReader.result as string);
                this.payload.currentYear = input.currentYear;
                this.payload.annualLeaveLimit = input.annualLeaveLimit;
                this.payload.homeOfficeLimit = input.homeOfficeLimit;
                input.daysMap.forEach((key: any) => {this.payload.daysMap.set(
                                          key.date, key.type)});

                this.notifyChildren();
            };
            fileReader.onerror = (error) => { console.log(error); };

            this.fileInput.nativeElement.value = null;
        }

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
