import {
	AfterViewChecked,
	Component,
	ElementRef, EventEmitter,
	HostListener,
	OnDestroy,
	ViewChild, ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ARTICLE} from '@shared/interfaces/content';
import {TextContentService} from '@shared/services/text-content.service';
import {CONTACTS} from '@shared/constants/contacts';
import {GeneralService} from "@shared/services/general.service";

@Component({
	selector: 'about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnDestroy, AfterViewChecked {
	article: ARTICLE;

	mapLink = CONTACTS.PHYSICAL_ADDRESS.REAL;
	@ViewChild('introVideo', {static: false}) introVideo: ElementRef;
	@HostListener('window:resize')

	public readonly articleSubscription: any;
	private readonly windowWidthUpdate = new EventEmitter<number>();

	constructor(textContentService: TextContentService, private generalService: GeneralService, private containerRef: ViewContainerRef) {
		this.articleSubscription = textContentService.aboutArticle.subscribe((article) => {
			this.article = article;
		});
	}

	ngAfterViewChecked(): void {
		setTimeout(() => {
			this.generalService.videoWidth.next(this.introVideo.nativeElement.clientWidth);
		});
	}

	ngOnDestroy() {
		if (this.articleSubscription) {
			this.articleSubscription.unsubscribe();
		}
	}

	private onWindowWidthUpdate() {
		this.generalService.videoWidth.next(this.introVideo.nativeElement.clientWidth);

		this.windowWidthUpdate.emit(
			this.containerRef.element.nativeElement.clientWidth
		);
	}
}
