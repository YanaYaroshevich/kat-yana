import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DropDownMenuItem} from '@shared/interfaces/drop-down-menu';

@Injectable({
	providedIn: 'root'
})
export class TopPanelLinkService {
	private _link = new BehaviorSubject<DropDownMenuItem>(null);

	get link(): Observable<DropDownMenuItem> {
		return this._link;
	}

	updateLink(item: DropDownMenuItem) {
		this._link.next(item);
	}
}
