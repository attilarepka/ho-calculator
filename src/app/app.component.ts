import {Component} from '@angular/core';

@Component({
    selector : 'app-root',
    templateUrl : './app.component.html',
    styleUrls : [ './app.component.css' ],
})
export class AppComponent {
    title = 'ho-calc';
    daysSelected: any[] = [];

    getNotification(event: any[]) {
        const index = this.daysSelected.findIndex((x) => x == event);
        if (index < 0)
            this.daysSelected.push(event);
        else
            this.daysSelected.splice(index, 1);

        console.log(this.daysSelected.length)
    }
}
