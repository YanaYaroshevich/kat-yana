import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GeneralService {
	videoWidth = new BehaviorSubject<number>(0);
}
