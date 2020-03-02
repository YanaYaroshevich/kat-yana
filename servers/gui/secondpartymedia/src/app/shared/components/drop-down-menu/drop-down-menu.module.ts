import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import {DropDownMenuItemComponent} from '@shared/components/drop-down-menu/drop-down-menu-item/drop-down-menu-item.component';
import { DropDownMenuListComponent } from './drop-down-menu-list/drop-down-menu-list.component';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
	declarations: [DropDownMenuComponent, DropDownMenuItemComponent, DropDownMenuListComponent],
	imports: [
		CommonModule,
		AppRoutingModule
	],
	exports: [DropDownMenuComponent]
})
export class DropDownMenuModule { }
