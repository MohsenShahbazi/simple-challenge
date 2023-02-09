import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormCreatorComponent} from './formcreator/form-creator.component';

const routes: Routes = [
  {
    path: '', component: FormCreatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
