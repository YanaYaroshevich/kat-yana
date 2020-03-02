import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerticalParallaxDirective} from '@shared/directives/vertical-parallax/vertical-parallax.directive';



@NgModule({
	declarations: [VerticalParallaxDirective],
	imports: [CommonModule],
	exports: [VerticalParallaxDirective]
})
export class VerticalParallaxModule { }
