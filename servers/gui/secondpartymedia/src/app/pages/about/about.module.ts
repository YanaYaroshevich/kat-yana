import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {RoundedCardModule} from '@shared/components/rounded-card/rounded-card.module';

@NgModule({
	declarations: [AboutComponent],
	imports: [
		CommonModule,
		RoundedCardModule
	],
	exports: [AboutComponent]
})
export class AboutModule { }
