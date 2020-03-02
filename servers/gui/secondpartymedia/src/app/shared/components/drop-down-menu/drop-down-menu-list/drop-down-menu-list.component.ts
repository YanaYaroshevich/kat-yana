import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropDownMenuItem} from '@shared/interfaces/drop-down-menu';
import {Interaction} from '@shared/types/common';

@Component({
	selector: 'drop-down-menu-list',
	templateUrl: './drop-down-menu-list.component.html',
	styleUrls: ['./drop-down-menu-list.component.scss']
})
export class DropDownMenuListComponent {
	@Input() items: DropDownMenuItem[];
	@Input() interaction: Interaction = 'hover';

	@Output() itemClick = new EventEmitter<DropDownMenuItem>();
	@Output() itemHover = new EventEmitter<DropDownMenuItem>();
	@Output() itemHoverOut = new EventEmitter<DropDownMenuItem>();
}
