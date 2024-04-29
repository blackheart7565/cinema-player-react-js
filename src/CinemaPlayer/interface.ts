// ~~

//	==========> Types <==========
export type StringNumber = string | number;

//	==========> Interface <==========

export interface ICinemaPlayer {
    url: string;
	/**
	 * @deprecated на даный момент свойство не будет работать
	 */
	isFastRewindForwardBtn?: boolean;
	dependencies?: any[];
	options?: IOptionPlayer;
}
export interface IVideoElement extends HTMLVideoElement {
    msRequestFullscreen?: () => void;
    mozRequestFullscreen?: () => void;
    webkitRequestFullscreen?: () => void;
}

export interface IOptionPlayer {
	width?: StringNumber;
	height?: StringNumber;
	borderRadius?: StringNumber;
}