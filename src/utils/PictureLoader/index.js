import Picture from './Picture';

Promise.prototype.finally = function (callback) {
    const PP = this.constructor;

    return this.then(
        value => PP.resolve(callback()).then(() => value),
        reason => PP.resolve(callback()).then(() => {
            throw reason;
        })
    );
};

const ua = window.navigator.userAgent.toLowerCase();
const isMobile = ua
    .match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) !== null
    && ua.match(/Mobile/i) !== null;
const isiPad = ua.match(/ipad/i) !== null;
const isAndroid = ua.match(/android/i) !== null;
const isAndroidPad = isAndroid && !isMobile;
const isTablet = isiPad || isAndroidPad;
const isIE = /(msie|trident)/i.test(navigator.userAgent);
const isDesktop = !(isMobile || isTablet);

class Component {

    static dataName = 'data-source';
    static flagBg = 'data-bg';
    static survivalTime = 1000 * 60 * 1;
    static useStorage = isDesktop && !isIE;

    static className = 'preload';
    static loadOne = function () {};
    static loadAll = function () {};

    static loadCount = 0;
    static pictureList = [];

    constructor(options) {
        for (const key in options) {
            this[key] = options[key];
        }

        if (this.sourceQueue === undefined) {
            for (const container of [...document.getElementsByClassName(this.className)]) {
                const src = container.getAttribute(Component.dataName);
                const useBg = container.getAttribute(Component.flagBg) !== null;

                const picture = new Picture({
                    src: require(`../../${src}`),
                    container,
                    useBg,
                });

                Component.pictureList.push(picture);
            }
        } else {
            for (const src of this.sourceQueue) {
                const picture = new Picture({
                    src: require(`../../${src}`),
                });

                Component.pictureList.push(picture);
            }
        }
        this.totalCount = Component.pictureList.length;
    }

    load() {
        if (this.totalCount === 0) {
            this.loadAll(this.totalCount);

            return;
        }

        for (const picture of Component.pictureList) {
            picture.load()
                .then(() => {
                // success
                    if (Component.useStorage) {
                        picture.save(Component.survivalTime);
                    }

                    picture.setContent();
                }, () => {
                // fail
                })
                .finally(() => {
                    this.loadHandler();
                });
        }
    }

    loadHandler() {
        Component.loadCount += 1;
        this.loadOne(Component.loadCount, this.totalCount);

        if (Component.loadCount === this.totalCount) {
            this.loadAll(this.totalCount);
        }
    }

}

export default Component;
