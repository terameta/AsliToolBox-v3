import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest/guest.component';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

const routes: Routes = [
	{ path: '', component: GuestComponent, loadChildren: './guest/guest.module#GuestModule' }
];

@NgModule( {
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		StoreModule.forRoot( AppReducer ),
		RouterModule.forRoot( routes ),
		StoreRouterConnectingModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
} )
export class AppModule { }
