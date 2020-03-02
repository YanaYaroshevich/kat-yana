export interface ARTICLE {
	TITLE: string;
	TEXT: string;
	THEME: string;
	LINK: string;
}

export interface CAROUSEL_ITEM {
	TITLE: string;
	SUBTITLE: string;
	TEXT: string;
	IMAGES: {
		DEVICE: string,
		PARALLAX: string
	};
	LINK?: string;
	DOCUMENT: string;
}
