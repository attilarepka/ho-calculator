import {Component, HostListener} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

import {
    FileServiceComponent
} from './services/file-service/file-service.component';

export interface Payload {
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
export class AppComponent {
    payload: Payload;
    selectionType: string = "homeoffice";
    title = 'ho-calc';
    fileService: any;

    constructor() {
        this.fileService = new FileServiceComponent(new FileSaverService);
        this.payload = {
            currentYear : 2023,
            homeOfficeLimit : 150,
            daysMap : new Map<string, string>,
            annualLeaveLimit : 0
        }
    }

    getNotification(event: any) {
        const key = event.key;
        if (this.payload.daysMap.get(key) == this.selectionType)
            this.payload.daysMap.delete(key);
        else
            this.payload.daysMap.set(key, this.selectionType);
    }

    generatePayload() {
        const payload = JSON.stringify(this.payload);
        this.fileService.onSave(payload);
    }

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
