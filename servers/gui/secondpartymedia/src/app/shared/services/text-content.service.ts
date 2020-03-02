import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTENT_KEYS } from '@shared/constants/content';
import {ARTICLE, CAROUSEL_ITEM} from '@shared/interfaces/content';

@Injectable({
	providedIn: 'root'
})
export class TextContentService {
	private _articles = new BehaviorSubject<readonly ARTICLE[]>([]);
	private _articleNames = new BehaviorSubject<readonly string[]>([]);
	private _carouselItems = new BehaviorSubject<readonly CAROUSEL_ITEM[]>([]);
	private _aboutArticle = new BehaviorSubject<ARTICLE>(null);

	constructor(translateService: TranslateService) {
		translateService.use('en');
		translateService.get(CONTENT_KEYS.ARTICLES).subscribe((result) => {
			this._articles.next(Object.values(result));
			this._articleNames.next(Object.keys(result));
		});
		translateService.get(CONTENT_KEYS.TOP_CAROUSEL).subscribe((result) => {
			this._carouselItems.next(result);
		});
		translateService.get(CONTENT_KEYS.ABOUT).subscribe((result) => {
			this._aboutArticle.next(result);
		});
	}

	get articles(): Observable<readonly ARTICLE[]> {
		return this._articles;
	}

	get articleNames(): Observable<readonly string[]> {
		return this._articleNames;
	}

	get carouselItems(): Observable<readonly CAROUSEL_ITEM[]> {
		return this._carouselItems;
	}

	get aboutArticle(): Observable<ARTICLE> {
		return this._aboutArticle;
	}
}
