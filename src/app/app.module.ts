import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {
    MatCalendarWrapperComponent
} from './components/mat-calendar-wrapper/mat-calendar-wrapper.component';
import {MaterialModule} from './material-module';

@NgModule({
    declarations : [ AppComponent, MatCalendarWrapperComponent ],
    imports : [
        BrowserModule, MaterialModule, BrowserAnimationsModule, MatIconModule
    ],
    providers : [],
    bootstrap : [ AppComponent ]
})
export class AppModule {
}
