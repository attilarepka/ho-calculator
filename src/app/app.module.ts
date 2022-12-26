import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileSaverModule} from 'ngx-filesaver';

import {AppComponent} from './app.component';
import {
    MatCalendarWrapperComponent
} from './components/mat-calendar-wrapper/mat-calendar-wrapper.component';
import {MaterialModule} from './material-module';
import {
    FileServiceComponent
} from './services/file-service/file-service.component';

@NgModule({
    declarations :
        [ AppComponent, MatCalendarWrapperComponent, FileServiceComponent ],
    imports : [
        BrowserModule, MaterialModule, BrowserAnimationsModule, MatIconModule,
        FileSaverModule, FormsModule
    ],
    providers : [],
    bootstrap : [ AppComponent ]
})
export class AppModule {
}
