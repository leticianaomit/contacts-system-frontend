import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PageTitleComponent, DialogDeleteComponent],
  exports: [PageTitleComponent, DialogDeleteComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
})
export class SharedComponentsModule {}
