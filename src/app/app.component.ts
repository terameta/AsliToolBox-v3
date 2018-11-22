import { Component } from '@angular/core';
import { NotificationService } from './notification/notification.service';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
} )
export class AppComponent {
	constructor( private notificationService: NotificationService ) { }
}
