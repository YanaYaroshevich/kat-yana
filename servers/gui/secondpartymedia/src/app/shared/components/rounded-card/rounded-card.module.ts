import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoundedCardComponent} from '@shared/components/rounded-card/rounded-card.component';

@NgModule({
	declarations: [RoundedCardComponent],
	imports: [
		CommonModule
	],
	exports: [RoundedCardComponent]
})
export class RoundedCardModule {
}
