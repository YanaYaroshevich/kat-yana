import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPanelComponent } from './top-panel.component';
import { AppRoutingModule } from 'app/app-routing.module';

@NgModule({
	declarations: [TopPanelComponent],
	imports: [
		CommonModule,
		AppRoutingModule
	],
	exports: [TopPanelComponent]
})
export class TopPanelModule { }
