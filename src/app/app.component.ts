import {Component, HostListener} from '@angular/core';

@Component({
    selector : 'app-root',
    templateUrl : './app.component.html',
    styleUrls : [ './app.component.css' ],
})
export class AppComponent {
    homeOfficeLimit: number = 150;
    annualLeaveLimit: number;
    selectionType: string = "homeoffice";
    title = 'ho-calc';
    daysSelected: any[] = [];

    getNotification(event: any[]) {
        const index = this.daysSelected.findIndex((x) => x == event);
        if (index < 0)
            this.daysSelected.push(event);
        else
            this.daysSelected.splice(index, 1);
    }

    @HostListener('contextmenu', [ '$event' ])
    onRightClick(event: {preventDefault: () => void}) {
        event.preventDefault();
    }
}
