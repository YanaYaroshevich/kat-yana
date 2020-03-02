import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {TranslateModule} from '@ngx-translate/core';
import {ImageTextCarouselModule} from '@shared/components/image-text-carousel/image-text-carousel.module';
import {RoundedCardModule} from '@shared/components/rounded-card/rounded-card.module';
import {VerticalParallaxModule} from '@shared/directives/vertical-parallax/vertical-parallax.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		TranslateModule,
		ImageTextCarouselModule,
		RoundedCardModule,
		VerticalParallaxModule
	],
	exports: [HomeComponent]
})
export class HomeModule {}
