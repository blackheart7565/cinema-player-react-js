//~~

/**
 * Метод првоеряет содержит ли браузер PictureInPicture(картинка в картинки)
 * eсли да то вернёт {true}, иначе {false}
 * */
export const canPiP = (): boolean =>
    "pictureInPictureEnabled" in document && document.pictureInPictureEnabled;


/**
 * Находится ли документ в режиме PictureInPicture(картинка в картинки),
 * {true} если назодится, {false} если не находится.
 * */
export const isInPiP = (): boolean =>
    Boolean(document.pictureInPictureElement);

/**
 * Метод для проверки можем ли мы взаемодействовать с PictureInPicture(картинка в картинки),
 * для этого мы ищем метод активации.
 * Подержка для {Safari} браузера
 * */
const supportsOldSafariPIP = () => {
    const video = document.createElement("video");

    return (
        canPiP() &&
        // @ts-ignore
        video.webkitSupportsPresentationMode &&
        // @ts-ignore
        typeof video.webkitSetPresentationMode === "function"
    );
}
/**
 * Метод для проверки можем ли мы взаемодействовать с PictureInPicture(картинка в картинки),
 * для этого мы ищем метод активации.
 * Подержка для {Chrome, Yandex, ...} браузера
 * */
const supportsModernPIP = () => {
    const video = document.createElement("video");

    return (
        canPiP() &&
        video.requestPictureInPicture &&
        typeof video.requestPictureInPicture === "function"
    );
}

/**
 * Метод определяет в каком браузере поддерживается
 * PictureInPicture(картинка в картинки)
 * */
export const supportsPIP = (): boolean =>
    supportsModernPIP() || supportsOldSafariPIP();


/**
 * Открытие окна PictureInPicture(картинка в картинки),
 * в поддерживаемом браузере
 * */
export const openPiP = async (video?: HTMLVideoElement | null) => {
    if (isInPiP()) return;

    if (supportsModernPIP()) {
        await video?.requestPictureInPicture();
    }
    if (supportsOldSafariPIP()) {
        // @ts-ignore
        await video?.webkitSetPresentationMode("picture-in-picture");
    }
}
/**
 * Закрытие окна PictureInPicture(картинка в картинки),
 * в поддерживаемом браузере
 * */
export const closePiP = async (video?: HTMLVideoElement | null) => {
    if (!isInPiP()) return;

    if (supportsModernPIP()) {
        await document?.exitPictureInPicture();
    }
    if (supportsOldSafariPIP()) {
        // @ts-ignore
        await video?.webkitSetPresentationMode("inline");
    }
}






















