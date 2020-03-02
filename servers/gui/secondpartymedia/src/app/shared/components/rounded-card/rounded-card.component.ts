import {Component, Input} from '@angular/core';

@Component({
	selector: 'rounded-card',
	templateUrl: './rounded-card.component.html',
	styleUrls: ['./rounded-card.component.scss']
})
export class RoundedCardComponent {
	@Input() text: string;
}

