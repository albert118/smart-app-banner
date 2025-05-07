import { getSmartAppBannerOptions } from '@data/options';
import {
    type SmartAppBannerEvents,
    DestroyedEvent,
    ReadyEvent,
} from '@data/events';
import { TypedEventTarget } from '@lib/TypedEventTarget';
import {
    type ParsedSmartBannerOptions,
    type SmartBannerOptions,
    type SupportedPlatForm,
} from '@models';
import { getCurrentPlatform } from '@utils/platformUtil';
import Logger from 'js-logger';

export class SmartAppBanner extends TypedEventTarget<SmartAppBannerEvents> {
    readonly options: ParsedSmartBannerOptions;
    readonly platform: SupportedPlatForm;
    readonly bannerId = 'smart-app-banner';

    private __body: HTMLBodyElement | null = null;
    private __bannerElement: HTMLElement | null = null;

    constructor(options: SmartBannerOptions) {
        super();

        this.options = getSmartAppBannerOptions(options);
        this.platform = getCurrentPlatform();

        Logger.info('successfully initialised');
    }

    // --------------------------------------------
    // Lifecycle
    mount() {
        this.__body = document.querySelector('body');

        if (!this.__body) {
            Logger.error('Failed to mount (is the document ready yet?)');
            return;
        }

        this.__bannerElement = document.createElement('div');
        this.__bannerElement.outerHTML = this.html;
        this.__bannerElement.id = this.bannerId;
        this.__body.prepend(this.__bannerElement);

        this.dispatchEvent(new ReadyEvent());
    }

    destroy() {
        if (!this.__bannerElement || !this.__body) return;
        this.__body.removeChild(this.__bannerElement);
        this.dispatchEvent(new DestroyedEvent());
    }

    // --------------------------------------------
    // Event Handlers

    // --------------------------------------------
    // Getters

    get title() {
        return this.options.title;
    }

    get author() {
        return this.options.author;
    }

    get price() {
        return this.options.price;
    }

    get icon() {
        return this.options.icon;
    }

    get buttonUrl() {
        // TODO:
        return this.options.appleButtonLabel;
    }

    get buttonLabel() {
        // TODO:
        return this.options.buttonLabel;
    }

    get html() {
        return `<div class="smartappbanner">
    <a href="#" class="smartappbanner__close" title="" href="nofollow" />
    <div
        class="smartappbanner__app-icon"
        style="background-image: url(${this.icon})"
    />
    <div class="smartappbanner__info">
        <div class="smartappbanner__description__title">
            ${this.title}
        </div>
        <div class="smartappbanner__description__author">
            ${this.author}
        </div>
        <div class="smartappbanner__description__price">
            ${this.price}
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
