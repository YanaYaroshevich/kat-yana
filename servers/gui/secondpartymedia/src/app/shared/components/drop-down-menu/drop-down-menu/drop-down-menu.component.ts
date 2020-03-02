import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DropDownMenuItem} from '@shared/interfaces/drop-down-menu';
import {Direction, Interaction} from '@shared/types/common';

@Component({
	selector: 'drop-down-menu',
	templateUrl: './drop-down-menu.component.html',
	styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent {
	@Input() rootItem: DropDownMenuItem;
	@Input() direction: Direction = 'down';
	@Input() interaction: Interaction = 'hover';

	@Output() itemClick = new EventEmitter<DropDownMenuItem>();
	@Output() itemHover = new EventEmitter<DropDownMenuItem>();
	@Output() itemHoverOut = new EventEmitter<DropDownMenuItem>();
}
