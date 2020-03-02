import { Component } from '@angular/core';
import {CONTACTS} from '@shared/constants/contacts';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	currentYear = (new Date()).getFullYear();

	shouldDisplayPlaceholder = false;

	CONTACTS = CONTACTS;
}
