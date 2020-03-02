import {animate, state, style, transition, trigger} from '@angular/animations';

const timings = {
	hiding: '.5s ease-in',
	appearing: '.5s .4s ease-in'
};

const styles = {
	hidden: style({
		opacity: 0
	}),
	shown: style({
		opacity: 1
	})
};

export const fadeInOutStates = {
	hidden: 'hidden',
	shown: 'shown'
};

export const fadeInOutAnimation = trigger('fadeInOut', [
	state(fadeInOutStates.hidden, styles.hidden),
	state(fadeInOutStates.shown, styles.shown),
	transition(`* => ${fadeInOutStates.shown}`, animate(timings.appearing)),
	transition(`* => ${fadeInOutStates.hidden}`, animate(timings.hiding))
]);
