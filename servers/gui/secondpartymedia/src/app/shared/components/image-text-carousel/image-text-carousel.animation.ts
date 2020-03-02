import {animate, state, style, transition, trigger} from '@angular/animations';

export const moveAnimationStates = {
	hiddenInLeft: 'hiddenInLeft',
	shownInCenter: 'shownInCenter',
	hiddenInRight: 'hiddenInRight'
};

export const units = 'vw';

export const offsets = {
	left: `-100${units}`,
	center: '0',
	right: `100${units}`
};

export const moveAnimationTime = 1000;

export const moveAnimation = trigger('moveFigureTrigger', [
	state(moveAnimationStates.hiddenInLeft, style({left: offsets.left})),
	state(moveAnimationStates.shownInCenter, style({left: offsets.center})),
	state(moveAnimationStates.hiddenInRight, style({left: offsets.right})),
	transition(`${moveAnimationStates.hiddenInLeft} <=> ${moveAnimationStates.hiddenInRight}`, animate('0s')),
	transition('* => *', animate(`${moveAnimationTime}ms 0s ease-in-out`))
]);

export const appearAnimation = trigger('appearTrigger', [
	transition(':enter', [
		style({
			opacity: 0
		}),
		animate('.5s .75s linear', style({
			opacity: 1
		}))
	])
]);
