import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
    MatCalendarWrapperComponent
} from './components/mat-calendar-wrapper/mat-calendar-wrapper.component';
import {MaterialModule} from './material-module';

@NgModule({
    declarations : [ AppComponent, MatCalendarWrapperComponent ],
    imports : [ BrowserModule, MaterialModule ],
    providers : [],
    bootstrap : [ AppComponent ]
})
export class AppModule {
}
