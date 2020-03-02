import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ARTICLE} from '@shared/interfaces/content';
import {TextContentService} from '@shared/services/text-content.service';
import {CONTACTS} from '@shared/constants/contacts';

@Component({
	selector: 'about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnDestroy {
	article: ARTICLE;

	mapLink = CONTACTS.PHYSICAL_ADDRESS.REAL;

	private readonly articleSubscription: Subscription;

	constructor(textContentService: TextContentService) {
		this.articleSubscription = textContentService.aboutArticle.subscribe((article) => {
			this.article = article;
		});
	}

	ngOnDestroy() {
		if (this.articleSubscription) {
			this.articleSubscription.unsubscribe();
		}
	}
}
