import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoenixComponent } from '../phoenix/phoenix.component';
import { QuestFormComponent } from '../quest-form/quest-form.component';

// import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'phoenix',
    pathMatch: 'full'
  },
  {
    path: 'phoenix',
    component: PhoenixComponent
  },
  {
    path: 'quest-form',
    component: QuestFormComponent
  }

//   { 
//     path: '**',
//     pathMatch: 'full',
//     component: NotFoundComponent
//    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
