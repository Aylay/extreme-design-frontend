interface Image {
	src: string;
	alt: string;
}

export default interface City {
	name: string;
	img: Image;
	id: number;
}
