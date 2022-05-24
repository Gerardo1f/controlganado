import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select'; 
import { MatNativeDateModule } from '@angular/material/core';
import { NativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  exports:[
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule ,
    MatDatepickerModule ,
    MatSelectModule,
    MatNativeDateModule,
    NativeDateModule,
    MatGridListModule,
    MatSnackBarModule

  ]
})
export class MaterialModule { }
