import { getSmartAppBannerOptions } from '@data/options';
import {
    type SmartAppBannerEvents,
    ClickedCallToAction,
    DestroyedEvent,
    ReadyEvent,
    ToggledVisibility,
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
import { useDismissalCookie } from '@data/dismissalCookie';

export class SmartAppBanner extends TypedEventTarget<SmartAppBannerEvents> {
    readonly options: ParsedSmartBannerOptions;

    /**
     * If the platform is undefined, then it is not a supported platform.
     * eg. a desktop environment (as this is intended for mobile)
     */
    readonly platform: SupportedPlatForm | undefined;
    readonly bannerId = 'smart-app-banner';
    private __bannerElement: HTMLElement | null = null;

    constructor(options: SmartBannerOptions) {
        super();

        this.options = getSmartAppBannerOptions(options);

        if (this.options.verbose) Logger.setLevel(Logger.DEBUG);

        this.platform = getCurrentPlatform();

        Logger.info('successfully initialised');
    }

    // --------------------------------------------
    // Lifecycle

    mount() {
        if (!this.platform) return;

        // handle Safari separately and avoid creating a component
        // https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
        if (this.platform === 'safari') {
            this.setUpSafari();
            return;
        }

        const dismissalCookie = useDismissalCookie();
        if (dismissalCookie.isDismissed()) return;

        Logger.time('mounting banner');

        this.__bannerElement = document.createElement('div');
        this.__bannerElement.innerHTML = this.html;
        this.__bannerElement.id = this.bannerId;

        document.body.prepend(this.__bannerElement);

        // bind "this" to event handlers
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickCallToAction = this.onClickCallToAction.bind(this);

        document
            .querySelector('.smartappbanner__close')
            ?.addEventListener('click', this.onClickClose, false);

        document
            .querySelector('.smartappbanner__view')
            ?.addEventListener('click', this.onClickCallToAction, false);

        Logger.debug('mounted banner');
        Logger.timeEnd('mounting banner');
        this.dispatchEvent(new ReadyEvent());
    }

    // You can’t display Smart App Banners inside a frame. Banners don’t appear in the iOS simulator.
    setUpSafari() {
        const metaTag = document.createElement('meta');
        metaTag.name = 'apple-itunes-app';
        metaTag.content = `app-id=${this.options.appleAppId}, app-argument=${this.options.appleAppArgumentUrl}`;
        document.head.append(metaTag);
        Logger.debug('added Safari configuration');
    }

    destroy() {
        if (
            !this.__bannerElement ||
            !this.platform ||
            this.platform === 'safari'
        )
            return;

        this.removeEventListeners();
        this.__bannerElement.remove();
        Logger.debug('destroyed banner');
        this.dispatchEvent(new DestroyedEvent());
    }

    /**
     * Toggles the banner visibility programmatically.
     * This still respects the platform visibility!
     *
     * @param visible
     */
    setBannerVisibility(visible: boolean) {
        const dismissalCookie = useDismissalCookie();

        if (visible) {
            Logger.debug('re-showing banner');
            dismissalCookie.show(this.options.dismissPath);
        } else {
            Logger.debug('dismissing banner');
            dismissalCookie.dismiss(this.options.dismissPath);
        }

        // refresh the component
        this.destroy();
        this.mount();
        this.dispatchEvent(new ToggledVisibility());
    }

    // --------------------------------------------
    // Event Handlers

    onClickClose(event: Event) {
        event.preventDefault();
        const dismissalCookie = useDismissalCookie();
        dismissalCookie.dismiss(this.options.dismissPath);
        this.destroy();
    }

    onClickCallToAction(event: Event) {
        this.dispatchEvent(new ClickedCallToAction());
    }

    removeEventListeners() {
        document
            .querySelector('.smartappbanner__close')
            ?.removeEventListener('click', this.onClickClose, false);

        document
            .querySelector('.smartappbanner__view')
            ?.removeEventListener('click', this.onClickCallToAction, false);
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

        if (this.platform === 'android' && this.options.androidPrice) {
            return this.options.androidPrice;
        }

        if (this.platform === 'ios' && this.options.applePrice) {
            return this.options.applePrice;
        }

        // if there's really nothign by this point - validation has failed
        // but we don't want to accidentally render null
        return this.options.price ?? '';
    }

    get icon() {
        if (this.platform === 'safari') return;

        if (this.platform === 'android' && this.options.androidIcon) {
            return this.options.androidIcon;
        }

        if (this.platform === 'ios' && this.options.appleIcon) {
            return this.options.appleIcon;
        }

        // if there's really nothign by this point - validation has failed
        // but we don't want to accidentally render null
        return this.options.icon ?? '';
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

        return `
<div class="smartappbanner">
    <div class="smartappbanner__close">
        <a
            href="#"
            href="nofollow"
        ></a>
    </div>
	<div
		class="smartappbanner__app-icon"
		style="background-image: url(${this.icon})"
	></div>
	<div class="smartappbanner__description">
		<div class="smartappbanner__description__title">${this.title}</div>
		<div class="smartappbanner__description__author">${this.author}</div>
		<div class="smartappbanner__description__price">${this.price}</div>
	</div>
	<a
		href="${this.buttonUrl}"
		target="_blank"
		rel="noopener"
		aria-label="${this.buttonLabel}"
		class="smartappbanner__view"
	>
		<span class="smartbanner__view__label">${this.buttonLabel}</span>
	</a>
</div>
`;
    }
}
