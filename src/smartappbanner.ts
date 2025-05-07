import { type SmartAppBannerEvents, DestroyedEvent, ReadyEvent } from '@events';
import { TypedEventTarget } from '@lib/TypedEventTarget';
import {
    DEFAULT_OPTIONS,
    type ParsedSmartBannerOptions,
    type SmartBannerOptions,
} from '@models';
import { optionsParser } from '@utils/optionsParser';
import Logger from 'js-logger';

export class SmartAppBanner extends TypedEventTarget<SmartAppBannerEvents> {
    readonly options: ParsedSmartBannerOptions;

    constructor(options: SmartBannerOptions) {
        super();

        this.options = optionsParser(DEFAULT_OPTIONS, options);

        this.dispatchEvent(new ReadyEvent());

        Logger.info('successfully initialised');
    }

    destroy() {
        this.dispatchEvent(new DestroyedEvent());
    }

    get html() {
        return `<div class="smartappbanner">
    <a href="#" class="smartappbanner__close" title="" href="nofollow" />
    <div
        class="smartappbanner__app-icon"
        style="background-image: url(${this.options.icon})"
    />
    <div class="smartappbanner__info">
        <div class="smartappbanner__description__title">
            ${this.options.title}
        </div>
        <div class="smartappbanner__description__author">
            ${this.options.author}
        </div>
        <div class="smartappbanner__description__price">
            ${this.options.price}
        </div>
    </div>
    <a
        href="${this.buttonUrl}"
        target="_blank"
        rel="noopener"
        aria-label="${this.buttonLabel}"
        class="smartappbanner__view"
    >
        <span class="smartbanner__view__label"></span>
    </a>
</div>
`;
    }
}
