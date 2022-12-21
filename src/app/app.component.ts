import {Component, HostListener} from '@angular/core';
import {FileSaverService} from 'ngx-filesaver';

import {
    FileServiceComponent
} from './services/file-service/file-service.component';

@Component({
    selector : 'app-root',
    templateUrl : './app.component.html',
    styleUrls : [ './app.component.css' ],
})
export class AppComponent {
    homeOfficeLimit: number = 150;
    annualLeaveLimit: number;
    daysMap: Map<string, string> = new Map<string, string>();
    currentYear: number;
    selectionType: string = "homeoffice";
    title = 'ho-calc';
    fileService: any;

    constructor() {
        this.fileService = new FileServiceComponent(new FileSaverService);
    }

    getNotification(event: any) {
        const key = event.key;
        if (this.daysMap.get(key) == this.selectionType)
            this.daysMap.delete(key);
        else
            this.daysMap.set(key, this.selectionType);
    }

    generatePayload() {
        const payload = "some payload";
        this.fileService.onSave(payload);
    }

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
