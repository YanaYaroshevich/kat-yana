import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopPanelModule} from '@shared/components/top-panel/top-panel.module';
import {HomeModule} from '@pages/home/home.module';
import {PlaceholderModule} from '@pages/placeholder/placeholder.module';
import {AboutModule} from '@pages/about/about.module';

export function TranslateHttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: TranslateHttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		TopPanelModule,
		HomeModule,
		PlaceholderModule,
		AboutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
