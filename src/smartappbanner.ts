import { type SmartAppBannerEvents, DestroyedEvent, ReadyEvent } from '@events';
import { TypedEventTarget } from '@lib/TypedEventTarget';
import type { ParsedSmartBannerOptions, SmartBannerOptions } from '@models';

export class SmartAppBanner extends TypedEventTarget<SmartAppBannerEvents> {
    readonly options: ParsedSmartBannerOptions;

    constructor(options: SmartBannerOptions) {
        super();
        this.validateOptions(options);
        // TODO: parse options
        // @ts-ignore
        this.options = options as ParsedSmartBannerOptions;

        this.dispatchEvent(new ReadyEvent());

        console.log('[📦️ Smart App Banner] successfully initialised');
    }

    validateOptions(options: SmartBannerOptions) {
        Object.entries(options).forEach(option => {
            if (typeof option[1] === 'string') {
                option[1].isFalsishOrEmpty() &&
                    console.warn(
                        `[📦️ Smart App Banner] Required option "${option[0]}" was not configured correctly`,
                    );
            }
        });
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
