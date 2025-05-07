import { getSmartAppBannerOptions } from '@data/options';
import {
    type SmartAppBannerEvents,
    ClickedCallToAction,
    DestroyedEvent,
    ReadyEvent,
} from '@data/events';
import { TypedEventTarget } from '@lib/TypedEventTarget';
import {
    SmartAppBannerError,
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

    private __closeButton: HTMLElement | null = null;
    private __callToActionButton: HTMLElement | null = null;

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

        this.__closeButton = document.querySelector('smartappbanner__close');
        this.__closeButton?.addEventListener('click', this.onClickClose, false);

        this.__callToActionButton = document.querySelector(
            'smartappbanner__close',
        );
        this.__callToActionButton?.addEventListener(
            'click',
            this.onClickCallToAction,
            false,
        );

        this.dispatchEvent(new ReadyEvent());
    }

    destroy() {
        if (!this.__bannerElement || !this.__body) return;
        this.removeEventListeners();
        this.__body.removeChild(this.__bannerElement);
        this.dispatchEvent(new DestroyedEvent());
    }

    // --------------------------------------------
    // Event Handlers

    onClickClose(event: Event) {
        this.destroy();
        event.preventDefault();
    }

    onClickCallToAction(event: Event) {
        this.dispatchEvent(new ClickedCallToAction());
        event.preventDefault();
    }

    removeEventListeners() {
        this.__closeButton?.removeEventListener(
            'click',
            this.onClickClose,
            false,
        );

        this.__callToActionButton?.removeEventListener(
            'click',
            this.onClickCallToAction,
            false,
        );
    }

    // --------------------------------------------
    // Getters
    //  - resolve platform specific settings as needed
    //  - Safari is handled purely through metatags

    get title() {
        if (this.platform === 'safari') return;
        return this.options.title;
    }

    get author() {
        if (this.platform === 'safari') return;
        return this.options.author;
    }

    get price() {
        if (this.platform === 'safari') return;
        return this.options.price;
    }

    get icon() {
        if (this.platform === 'safari') return;

        if (this.platform === 'android' && this.options.androidIcon) {
            return this.options.androidIcon;
        }

        if (this.platform === 'ios' && this.options.appleIcon) {
            return this.options.appleIcon;
        }

        return this.options.icon;
    }

    get buttonUrl() {
        if (this.platform === 'safari') return;

        if (this.platform === 'android' && this.options.googlePlayStoreUrl) {
            return this.options.googlePlayStoreUrl;
        }

        if (this.platform === 'ios' && this.options.appStoreUrl) {
            return this.options.appStoreUrl;
        }
    }

    get buttonLabel() {
        if (this.platform === 'safari') return;

        if (this.platform === 'android' && this.options.androidButtonLabel) {
            return this.options.androidButtonLabel;
        }

        if (this.platform === 'ios' && this.options.appleButtonLabel) {
            return this.options.appleButtonLabel;
        }

        return this.options.buttonLabel;
    }

    get html() {
        if (this.platform === 'safari') {
            throw new SmartAppBannerError(
                'Attempted to render banner. However, the current platform is Safari. This should instead be handled via their recommended meta tag.\nSee: https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners',
            );
        }

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
