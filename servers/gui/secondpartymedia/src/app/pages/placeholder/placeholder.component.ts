import { Component, Input } from '@angular/core';
import { CONTACTS } from '@shared/constants/contacts';

@Component({
	selector: 'placeholder',
	templateUrl: './placeholder.component.html',
	styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {
	@Input() copyrightYear: number;

	CONTACTS = CONTACTS;
}
