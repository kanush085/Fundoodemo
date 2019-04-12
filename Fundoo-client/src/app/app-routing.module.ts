import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteComponent } from './components/note/note.component';
import { AuthGuard } from '../app/service/auth/auth.guard';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
},{
  path:'login',
  component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'forgotpassword',
  component:ForgotpasswordComponent
},
{
  path:'resetpassword/:token',
  component:ResetpasswordComponent
},
{
path:'dashboard',
component:DashboardComponent,canActivate:[AuthGuard],
children:[
  {
    path:'',
    redirectTo:'note',
    pathMatch:'full'
  },
{
  path:'note',
  component:NoteComponent
  
},
{
  path : 'archive',
  component: ArchiveComponent
},
{
  path : 'trash',
  component: TrashComponent
}
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
