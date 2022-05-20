import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './contact/contact.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GenQuestComponent } from './gen-quest/gen-quest.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path : '', component : LandingComponent },
  { path : 'contact', component : ContactComponent },
  { path : 'service', component :  FileUploadComponent },
  { path : 'generate-questions', component : GenQuestComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'about', component : AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
