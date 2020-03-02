import {ImageSizes, VideoResolutions} from '@shared/constants/content';

const widths = Object.values(ImageSizes).sort((a: number, b: number) => a - b);
const largestWidth = widths[widths.length - 1] as number;

export function getWidthForImage(containerWidth: number) {
	return widths.find((width) => containerWidth <= width) as number || largestWidth;
}

const resolutions = Object.values(VideoResolutions).sort((a, b) => a.width - b.width);
const largestResolution = resolutions[resolutions.length - 1];

export function getResolutionForWidth(containerWidth: number) {
	return resolutions.find((res) => containerWidth <= res.width) || largestResolution;
}

const videoHeightPlaceholder = '{height}';
const videoName = `assets/videos/2ndPartyMedia-${videoHeightPlaceholder}`;
const mp4Postfix = '.mp4';
const webmPostfix = '.webm';

export function getVideoNameForHeight(height: number) {
	const name = videoName.replace(videoHeightPlaceholder, height.toString());
	return {
		webm: `${name}${webmPostfix}`,
		mp4: `${name}${mp4Postfix}`
	};
}
