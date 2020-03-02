import {
	AfterViewChecked,
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import {TextContentService} from '@shared/services/text-content.service';
import {Subscription} from 'rxjs';
import {ARTICLE, CAROUSEL_ITEM} from '@shared/interfaces/content';
import {TopPanelLinkService} from '@shared/services/top-panel-link.service';
import {getResolutionForWidth, getVideoNameForHeight} from '@shared/helpers/sizes.helper';
import {VIDEO_RESOLUTION_UPDATE_DEBOUNCE_TIME} from '@shared/constants/content';
import {debounceTime} from 'rxjs/operators';
import {GeneralService} from '@shared/services/general.service';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
	articles: readonly ARTICLE[];
	carouselItems: readonly CAROUSEL_ITEM[];
	currentSolutionsIndex = 0;

	@ViewChild('introVideo', {static: false}) introVideo: ElementRef;
	@HostListener('window:resize')
	readonly windowResizeListener = this.onWindowWidthUpdate;
	private readonly windowWidthUpdate = new EventEmitter<number>();
	private videoHeight: number;

	private readonly articleNamesSubscription: Subscription;
	private readonly carouselItemsSubscription: Subscription;
	private readonly linkSubscription: Subscription;
	private readonly windowWidthUpdateSubscription: Subscription;

	constructor(textContentService: TextContentService, linkService: TopPanelLinkService, private containerRef: ViewContainerRef, private generalService: GeneralService) {
		this.articleNamesSubscription = textContentService.articles.subscribe((articles) => {
			this.articles = articles;
		});
		this.carouselItemsSubscription = textContentService.carouselItems.subscribe((items) => {
			this.carouselItems = items;
		});
		this.linkSubscription = linkService.link.subscribe((link) => {
			if (!link) {
				return;
			}

			const i = this.carouselItems && this.carouselItems.findIndex(item => `.${item.LINK}` === link.link);
			if (i !== undefined && i !== null && i >= 0) {
				this.currentSolutionsIndex = i;
			}
		});
		this.windowWidthUpdateSubscription = this.windowWidthUpdate.pipe(
			debounceTime(VIDEO_RESOLUTION_UPDATE_DEBOUNCE_TIME)
		).subscribe((width) => {
			this.videoHeight = getResolutionForWidth(width).height;
		});
	}

	ngOnInit() {
		this.videoHeight = getResolutionForWidth(
			this.containerRef.element.nativeElement.clientWidth
		).height;
	}

	ngAfterViewChecked(): void {
		setTimeout(() => {
			this.generalService.videoWidth.next(this.introVideo.nativeElement.clientWidth);
		});
	}

	ngOnDestroy() {
		if (this.articleNamesSubscription) {
			this.articleNamesSubscription.unsubscribe();
		}
		if (this.carouselItemsSubscription) {
			this.carouselItemsSubscription.unsubscribe();
		}
		if (this.linkSubscription) {
			this.linkSubscription.unsubscribe();
		}
		if (this.windowWidthUpdateSubscription) {
			this.windowWidthUpdateSubscription.unsubscribe();
		}
	}

	get videoNames() {
		return getVideoNameForHeight(this.videoHeight);
	}

	private onWindowWidthUpdate() {
		this.generalService.videoWidth.next(this.introVideo.nativeElement.clientWidth);

		this.windowWidthUpdate.emit(
			this.containerRef.element.nativeElement.clientWidth
		);
	}
}
