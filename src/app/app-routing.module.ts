import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './admin/user/user.component';
import { EmailComponent } from './admin/email/email.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'person', component: PersonComponent},
  { path: 'order', component: OrderComponent},
  { path: 'admin/user', component: UserComponent},
  { path: 'admin/email', component: EmailComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
