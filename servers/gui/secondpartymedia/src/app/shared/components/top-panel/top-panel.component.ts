import {Component, HostListener, OnDestroy} from '@angular/core';
import { TextContentService } from '@shared/services/text-content.service';
import {Observable, of, Subscription} from 'rxjs';
import {DropDownMenuItem} from '@shared/interfaces/drop-down-menu';
import {TopPanelLinkService} from '@shared/services/top-panel-link.service';
import {Router} from '@angular/router';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {GeneralService} from '@shared/services/general.service';

@Component({
	selector: 'top-panel',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnDestroy {
	articleNames: readonly string[];
	selectedNavGroup: DropDownMenuItem;
	isLogoImageInline = false;
	isCurrentlyAtHome$: Observable<boolean> = of(false);
	videoWidth: number;

	testItems: DropDownMenuItem[] = [
		{
			title: 'Полезно знать',
			items: [
				{
					title: 'ВОЗ рекомендует',
					link: '#voz'
				},
				{
					title: 'Хим. состав',
					link: '#contents'
				},
				{
					title: 'Применение',
					link: '#apply'
				},
				{
					title: 'Сертификат',
					link: '#certificate'
				}
			]
		},
		{
			title: 'Продукты',
			items: [
				{
					title: 'Триосепт-ОЛ 100мл',
					link: '.TRISEPTOL-100'
				},
                {
                    title: 'Триосепт-ОЛ 1л',
                    link: '.TRISEPTOL-1000'
                },
                {
                    title: 'Триосепт-ОЛ 1л с дозатором',
                    link: '.TRISEPTOL-1000-special'
                }
			]
		},
		{
			title: 'О Производителе',
			link: 'about'
		}
	];

	maxWidthForNavGroups = this.widthForNavGroup(this.testItems.reduce((max, item) => item.items && item.items.length > max.items.length ? item : max));

	private readonly articleNamesSubscription: Subscription;

	constructor(textContentService: TextContentService, private linkService: TopPanelLinkService, private router: Router, private generalService: GeneralService) {
		this.articleNamesSubscription = textContentService.articleNames.subscribe((names) => {
			this.articleNames = names;
		});
		this.isCurrentlyAtHome$ = this.router.events.pipe(
			map(() => {
				return this.router.url === '/';
			})
		);
		this.generalService.videoWidth.pipe(distinctUntilChanged()).subscribe((val) => {
			console.log(val);
			this.videoWidth = val;
		});
	}

	ngOnDestroy() {
		if (this.articleNamesSubscription) {
			this.articleNamesSubscription.unsubscribe();
		}
	}

	get navGroups() {
		return this.testItems.filter(item => item.items && item.items.length);
	}

	@HostListener('document:click', ['$event.target']) onDocumentClick(target: HTMLElement) {
		if (
			target.classList.contains('navigation-main-item') ||
			target.classList.contains('navigation-main-item-text')
		) {
			return;
		}

		this.selectedNavGroup = null;
	}

	@HostListener('window:scroll') onWindowScroll() {
		this.isLogoImageInline = !!window.scrollY;
	}

	onNavItemClick(item) {
		this.linkService.updateLink(item);
	}

	onItemClick(item) {
		if (!item.items || !item.items.length) {
			return;
		}

		this.selectedNavGroup = item;
	}

	goToLink(item, event) {
		event.stopPropagation();

		this.router.navigate(['/']).then(() => {
			setTimeout(() => {
				const element = Array.from(document.querySelectorAll(item.link)).find((elem) => !!elem.clientHeight);
				if (!element) {
					return;
				}
				const topMenu = Array.from(document.getElementsByClassName('navigation-main-container')).find((menu) => !!menu.clientHeight);
				window.scrollTo({top: element.getBoundingClientRect().top + window.scrollY - topMenu.clientHeight});
				this.selectedNavGroup = null;
			});
		});
	}

	scrollToTop() {
		window.scrollTo({top: 0});
	}

	private widthForNavGroup(navGroup: DropDownMenuItem) {
		return `${navGroup.items.length / 2 * 20 + 10 + 7.5 / 4}rem`;
	}
}
