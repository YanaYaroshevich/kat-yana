import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy} from '@angular/core';
import {throttleTime} from 'rxjs/operators';

/**
 * @description
 * Adds custom vertical parallax effect to element.
 * Currently only guarantees to work with <img> elements.
 */
@Directive({
	selector: '[verticalParallax]'
})
export class VerticalParallaxDirective implements OnDestroy {
	private static readonly THROTTLE_TIME = 100;
	private static readonly TRANSITION_VALUE = `transform ${VerticalParallaxDirective.THROTTLE_TIME}ms linear`;

	// currently vh only
	@Input() verticalScrollSpace = 100;

	private readonly onScroll = new EventEmitter();
	private readonly onResize = new EventEmitter();

	private readonly scrollSubscription = this.onScroll
		.pipe(throttleTime(VerticalParallaxDirective.THROTTLE_TIME))
		.subscribe(() => {
			this.updateOffset();
		});
	private readonly resizeSubscription = this.onResize
		.pipe(throttleTime(VerticalParallaxDirective.THROTTLE_TIME))
		.subscribe(() => {
			this.clearOffset();
			setTimeout(() => {
				this.getMeasurements();
				this.updateOffset();
			}, VerticalParallaxDirective.THROTTLE_TIME);	// Transition time needs to pass in order to capture correct measurements
		});

	private topBorder: number;
	private containerHeight: number;
	private elementHeight: number;
	private scrollSpeed: number;

	constructor(private readonly elementRef: ElementRef<HTMLImageElement>) {
		elementRef.nativeElement.onload = () => {
			this.getMeasurements();
			this.applyTransition();
			this.updateOffset();
		};
	}

	ngOnDestroy() {
		this.scrollSubscription.unsubscribe();
		this.resizeSubscription.unsubscribe();
	}

	@HostListener('window:scroll') onWindowScroll() {
		this.onScroll.emit();
	}

	@HostListener('window:resize') onWindowResize() {
		this.onResize.emit();
	}

	private applyTransition() {
		const curTransition = window.getComputedStyle(this.element).transition;

		if (!curTransition) {
			this.element.style.transition = VerticalParallaxDirective.TRANSITION_VALUE;
			return;
		}

		this.element.style.transition = `${curTransition}, ${VerticalParallaxDirective.TRANSITION_VALUE}`;
	}

	private getMeasurements() {
		this.topBorder = window.scrollY + this.element.getBoundingClientRect().top;
		this.containerHeight = window.innerHeight * (this.verticalScrollSpace / 100);
		this.elementHeight = this.element.clientHeight;
		this.scrollSpeed =  (this.elementHeight + this.containerHeight) / (window.innerHeight + this.containerHeight);
	}

	private updateOffset() {
		const offset = -this.elementHeight + (window.scrollY - (this.topBorder - window.innerHeight)) * this.scrollSpeed;
		this.applyOffset(offset);
	}

	// TODO: preserve possible current transform vars
	private applyOffset(offset: number) {
		this.element.style.transform = `translateY(${offset}px)`;
	}

	// TODO: preserve possible current transform vars
	private clearOffset() {
		this.element.style.transform = '';
	}

	private get element() {
		return this.elementRef.nativeElement;
	}
}
