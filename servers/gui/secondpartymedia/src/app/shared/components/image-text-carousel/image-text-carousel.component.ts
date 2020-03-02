import {
	Component,
	ViewContainerRef,
	Input,
	OnChanges,
	SimpleChanges,
	Output,
	EventEmitter,
	OnDestroy
} from '@angular/core';
import { CAROUSEL_ITEM } from '@shared/interfaces/content';
import {
	appearAnimation,
	moveAnimation,
	moveAnimationStates,
	moveAnimationTime
} from '@shared/components/image-text-carousel/image-text-carousel.animation';
import {throttleTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
	selector: 'image-text-carousel',
	templateUrl: './image-text-carousel.component.html',
	styleUrls: ['./image-text-carousel.component.scss'],
	animations: [moveAnimation, appearAnimation]
})
export class ImageTextCarouselComponent implements OnChanges, OnDestroy {
	private static readonly ITEM_SWITCH_THROTTLE_TIME = moveAnimationTime / 2;

	@Input() items: readonly CAROUSEL_ITEM[];
	@Input() currentIndex = 0;

	@Output() indexChange = new EventEmitter<number>();

	width: number;
	itemsCount: number;

	private _indexChange = new EventEmitter<number>();
	private indexChangeSubscription: Subscription;

	constructor(private containerRef: ViewContainerRef) {
		this.indexChangeSubscription = this._indexChange.pipe(
			throttleTime(ImageTextCarouselComponent.ITEM_SWITCH_THROTTLE_TIME)
		).subscribe((index) => {
			this.indexChange.emit(index);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.items && changes.items.currentValue && changes.items.currentValue.length) {
			this.currentIndex = 0;
			this.itemsCount = this.items.length;
		}

		if (changes.currentIndex) {
			this.currentIndex = this.getValidIndex(changes.currentIndex.currentValue);
		}
	}

	ngOnDestroy() {
		this.indexChangeSubscription.unsubscribe();
	}

	switchToNext() {
		this.switchTo(this.currentIndex + 1);
	}

	switchToPrev() {
		this.switchTo(this.currentIndex - 1);
	}

	switchTo(index: number) {
		this._indexChange.emit(this.getValidIndex(index));
	}

	getImgUrlForItem(item: CAROUSEL_ITEM) {
		return this.getImgUrlFromName(item.IMAGES.DEVICE);
	}

	getUrlForPdf(item: CAROUSEL_ITEM) {
		return `assets/downloads/${item.DOCUMENT}`;
	}

	goToPdf(item: CAROUSEL_ITEM, event: Event) {
		if (!item.DOCUMENT.length) {
			event.preventDefault();
			return;
		}

		window.open(`assets/downloads/${item.DOCUMENT}`, '_blank');
	}

	// this method does not work as intended for 2 items
	// just in case
	animationStateForIndex(index: number) {
		if (index === this.currentIndex) {
			return moveAnimationStates.shownInCenter;
		}

		if (this.isIndexToLeft(index)) {
			return moveAnimationStates.hiddenInLeft;
		}

		if (this.isIndexToRight(index)) {
			return moveAnimationStates.hiddenInRight;
		}
	}

	private isIndexToLeft(index: number) {
		const itemsCount = this.items.length;
		const cur = this.currentIndex;

		if (itemsCount <= 1) {
			return false;
		}

		if (index === 0) {
			return cur !== itemsCount - 1;
		}

		return cur === 0 && index === itemsCount - 1 || index < cur;
	}

	private isIndexToRight(index: number) {
		const itemsCount = this.items.length;
		const cur = this.currentIndex;

		if (itemsCount <= 1) {
			return false;
		}

		if (index === itemsCount - 1) {
			return cur !== 0;
		}

		return cur === itemsCount - 1 && index === 0 || index > cur;
	}

	private getImgUrlFromName(imgName: string) {
		return `assets/images/solutions/${imgName}`;
	}

	private getValidIndex(index: number) {
		if (index >= this.items.length) {
			index = 0;
		} else if (index < 0) {
			index = this.items.length - 1;
		}

		return index;
	}
}
