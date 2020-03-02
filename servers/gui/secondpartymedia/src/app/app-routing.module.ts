import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeRoutes} from '@pages/home/home.routes';
import {AboutRoutes} from '@pages/about/about.routes';


const routes: Routes = [
	...AboutRoutes,
	...HomeRoutes
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
