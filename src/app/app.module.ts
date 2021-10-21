import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { InterceptorModule } from './core/interceptor/interceptor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InterceptorModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
