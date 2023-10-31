// ~~

export interface ICinemaPlayer {
    url: string;
    isFastRewindForwardBtn?: boolean;
}
export interface IVideoElement extends HTMLVideoElement {
    msRequestFullscreen?: () => void;
    mozRequestFullscreen?: () => void;
    webkitRequestFullscreen?: () => void;
}
