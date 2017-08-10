export default class {
    flagTopReachBottom = false;
    flagBottomReachTop = false;
    flagBottomReachBottom = false;

    offsetTopEnterBottom = 0;
    offsetTopLeaveBottom = 0;
    offsetBottomReachTop = 0;

    offsetBottomEnterBottom = 0;
    offsetBottomLeaveBottom = 0;


    triggleArray = [];
    flagBottomReachTopArray = [];
    enterHandlers = [];
    leaveHandlers = [];


    onTopEnterBottom = function() {};
    onTopLeaveBottom = function() {};
    onBottomEnterTop = function() {};
    onBottomLeaveTop = function() {};
    onBottomEnterBottom = function() {};
    onBottomLeaveBottom = function() {};

    onToggleEnterHanlders = function() {};
    onToggleLeaveHanlders = function() {};

    onEnterArea = function() {};
    onLeaveArea = function() {};

    constructor(options) {
        for(const key in options) {
            this[key] = options[key];
        }

        if(this.triggleArray.length !== 0) {
            this.triggleArray.forEach((item, i) => {
                this.flagBottomReachTopArray[i] = false;
            });
        }
        this._onEntranceHandler = this.entranceHandler.bind(this);
        window.addEventListener('scroll', this._onEntranceHandler);
        window.addEventListener('resize', this._onEntranceHandler);

        this._onEntranceHandler();
    }

    entranceHandler() {
        const innerHeight = window.innerHeight;
        let rect = this.el.getBoundingClientRect();

        this.adjustEdge(innerHeight, rect);
    }

    adjustEdge(innerHeight, rect) {
        const flagTopHigherThanBottom = (rect.top + this.offsetTopEnterBottom) <= innerHeight;
        const flagTopLowerThanBottom = (rect.top + this.offsetTopLeaveBottom) > innerHeight;

        const flagBottomHigherThanTop = (rect.bottom + this.offsetBottomReachTop) < 0;
        const flagBottomLowerThanTop = (rect.bottom + this.offsetBottomReachTop) >= 0;

        const flagBottomHigherThanBottom = (rect.bottom + this.offsetBottomEnterBottom) <= innerHeight;
        const flagBottomLowerThanBottom = (rect.bottom + this.offsetBottomLeaveBottom) > innerHeight;

        let flagBottomHigherThanTopArray = [];
        let flagBottomLowerThanTopArray = [];


        if(this.triggleArray.length !== 0) {
            const domHeight = rect.bottom - rect.top;
            for(let i=0;i<this.triggleArray.length;++i) {
                flagBottomLowerThanTopArray[i] = (rect.bottom - domHeight * (1 - this.triggleArray[i]) + this.offsetBottomReachTop) >= 0;
                flagBottomHigherThanTopArray[i] = (rect.bottom - domHeight * (1 - this.triggleArray[i]) + this.offsetBottomReachTop) < 0;

                // triggle percent bottom enter top
                if(flagBottomLowerThanTopArray[i] && this.flagBottomReachTopArray[i]) {
                    this.flagBottomReachTopArray[i] = false;
                    this.onToggleEnterHanlders.call(this.el, i);
                    break;
                }

                // triggle percent bottom leave top
                if(flagBottomHigherThanTopArray[i] && !this.flagBottomReachTopArray[i]) {
                    this.flagBottomReachTopArray[i] = true;
                    this.onToggleLeaveHanlders.call(this.el, i);
                    break;
                }
            }
        }


        // top enter bottom
        if(flagTopHigherThanBottom && !this.flagTopReachBottom) {
            this.flagTopReachBottom = true;
            this.onTopEnterBottom.call(this.el);
            this.onEnterArea.call(this.el);
        }

        // top leave bottom
        if(flagTopLowerThanBottom && this.flagTopReachBottom) {
            this.flagTopReachBottom = false;
            this.onTopLeaveBottom.call(this.el);
            this.onLeaveArea.call(this.el);
        }

        // bottom leave top
        if(flagBottomHigherThanTop && !this.flagBottomReachTop) {
            this.flagBottomReachTop = true;
            this.onBottomLeaveTop.call(this.el);
            this.onLeaveArea.call(this.el);
        }

        // bottom enter top
        if(flagBottomLowerThanTop && this.flagBottomReachTop) {
            this.flagBottomReachTop = false;
            this.onBottomEnterTop.call(this.el);
            this.onEnterArea.call(this.el);
        }

        // bottom leave bottom
        if(flagBottomHigherThanBottom && !this.flagBottomReachBottom) {
            this.flagBottomReachBottom = true;
            this.onBottomLeaveBottom.call(this.el);
            this.onLeaveArea.call(this.el);
        }

        // bottom enter bottom
        if(flagBottomLowerThanBottom && this.flagBottomReachBottom) {
            this.flagBottomReachBottom = false;
            this.onBottomEnterBottom.call(this.el);
            this.onEnterArea.call(this.el);
        }
    }

    destroyArrivalListener() {
        window.removeEventListener('scroll', this._onEntranceHandler);
        window.removeEventListener('resize', this._onEntranceHandler);
    }
}
