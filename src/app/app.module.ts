import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
    declarations: [AppComponent],
    imports: [
      AppRoutingModule,
      BrowserModule,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        provideHttpClient(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
