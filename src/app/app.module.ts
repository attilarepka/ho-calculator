import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatCalendarWrapperComponent } from './mat-calendar-wrapper/mat-calendar-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MatCalendarWrapperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
