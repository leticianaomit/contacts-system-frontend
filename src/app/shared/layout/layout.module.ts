import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LayoutComponent, ToolbarComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class LayoutModule {}
