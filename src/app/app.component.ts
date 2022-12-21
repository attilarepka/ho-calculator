import {Component, HostListener} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

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
export class AppComponent {
    payload: Payload;
    selectionType: string = "homeoffice";
    title = 'ho-calc';
    fileService: any;
    selectedFile: File;

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

    savePayload() {
        const payloadJSON = JSON.parse(JSON.stringify(this.payload));
        const array = Array.from(this.payload.daysMap,
                                 ([ date, type ]) => ({date, type}));
        payloadJSON.daysMap = array;
        this.fileService.onSave(JSON.stringify(payloadJSON));
    }

    loadPayload(payload: any) {
        this.selectedFile = payload.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(this.selectedFile, "UTF-8");
        fileReader.onload = () => {
            const payloadJSON = JSON.parse(fileReader.result as string);
            this.payload = payloadJSON;
        };
        fileReader.onerror = (error) => { console.log(error); };
    }

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
