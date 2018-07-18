import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { TreeModule } from 'ng2-tree';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HotTableModule } from 'ng2-handsontable';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './admin/user/user.component';
import { EmailComponent } from './admin/email/email.component';
import { TreeComponent } from './tree/tree.component';
import { GridComponent } from './grid/grid.component';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    OrderComponent,
    UserComponent,
    EmailComponent,
    TreeComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    TreeModule,
    Ng2TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Ng2BootstrapModule.forRoot(),
    PaginationModule.forRoot(),
    HotTableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
