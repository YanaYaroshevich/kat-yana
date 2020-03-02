import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewRef} from '@angular/core';
import {DropDownMenuItem} from '@shared/interfaces/drop-down-menu';
import {Direction, Interaction} from '@shared/types/common';
import {DIRECTION_TO_ICON} from '@shared/constants/common';

@Component({
	selector: 'drop-down-menu-item',
	templateUrl: './drop-down-menu-item.component.html',
	styleUrls: ['./drop-down-menu-item.component.scss']
})
export class DropDownMenuItemComponent {
	@Input() item: DropDownMenuItem;
	@Input() direction: Direction = 'down';
	@Input() interaction: Interaction = 'hover';
	@Input() isRootItem = false;

	@Output() itemClick = new EventEmitter<DropDownMenuItem>();
	@Output() itemHover = new EventEmitter<DropDownMenuItem>();
	@Output() itemHoverOut = new EventEmitter<DropDownMenuItem>();

	isExpanded = false;
	expandedChildrenCount = 0;

	constructor(private viewRef: ElementRef) {}

	onItemClick() {
		this.itemClick.emit(this.item);

		if (this.interaction !== 'click') {
			return;
		}

		this.isExpanded = true;
	}

	onItemHover() {
		this.itemHover.emit(this.item);

		if (this.interaction !== 'hover') {
			return;
		}

		this.isExpanded = true;
	}

	onItemHoverOut() {
		this.itemHoverOut.emit(this.item);

		if (this.interaction !== 'hover') {
			return;
		}

		if (this.hasChildren) {
			setTimeout(() => {
				this.isExpanded = false;
			}, 100);
		} else {
			this.isExpanded = false;
		}
	}

	onChildItemClick(item: DropDownMenuItem) {
		this.itemClick.emit(item);

		if (this.interaction !== 'click') {
			return;
		}
	}

	onChildItemHover(item: DropDownMenuItem) {
		this.itemHover.emit(item);

		if (this.interaction !== 'hover') {
			return;
		}

		this.expandedChildrenCount += 1;
	}

	onChildItemHoverOut(item: DropDownMenuItem) {
		this.itemHoverOut.emit(item);

		if (this.interaction !== 'hover' || this.expandedChildrenCount === 0) {
			return;
		}

		setTimeout(() => {
			this.expandedChildrenCount -= 1;
		}, 100);
	}

	goToLink(link: string, event) {
		event.stopPropagation();
		const element = document.querySelector(link);
		if (!element) {
			return;
		}
		window.scrollTo({top: element.getBoundingClientRect().top + window.scrollY});
	}

	@HostListener('document:click', ['$event.target']) onDocumentClick(target: HTMLElement) {
		if (
			this.interaction !== 'click' ||
			(this.viewRef.nativeElement as HTMLElement).contains(target)) {
			return;
		}

		this.isExpanded = false;
	}

	get hasChildren() {
		return this.item.items && !!this.item.items.length;
	}

	get itemLink() {
		return `#${this.item.link}`;
	}

	get expandIndicator() {
		return DIRECTION_TO_ICON.get(this.direction);
	}

	get menuListClass() {
		return `menu-list ${this.direction}`;
	}
}
