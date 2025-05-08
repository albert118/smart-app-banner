import { TypedEvent } from '@lib/TypedEventTarget';
import type { SmartAppBanner } from '../smartappbanner';

/**
 * A list of all the events the component can emit.
 */
export type SmartAppBannerEvents =
    | ReadyEvent
    | DestroyedEvent
    | ClickedCallToAction
    | ToggledVisibility;

/**
 * Base class for all events dispatched by {@link SmartAppBanner}
 */
export abstract class SmartAppBannerEvent extends TypedEvent<SmartAppBanner> {}

/**
 * @event Triggered once the smart app banner is ready.
 */
export class ReadyEvent extends SmartAppBannerEvent {
    static override readonly type = 'ready';

    /** @internal */
    constructor() {
        super(ReadyEvent.type, true);
    }
}

/**
 * @event Triggered once the smart app banner is destroyed.
 */
export class DestroyedEvent extends SmartAppBannerEvent {
    static override readonly type = 'destroyed';

    /** @internal */
    constructor() {
        super(DestroyedEvent.type, true);
    }
}

/**
 * @event Triggered when the user clicks the call to action button (aka. "View" button by default)
 */
export class ClickedCallToAction extends SmartAppBannerEvent {
    static override readonly type = 'clicked-call-to-action';

    /** @internal */
    constructor() {
        super(ClickedCallToAction.type, true);
    }
}

/**
 * @event Triggered when the user clicks the dismiss button or programmatically toggles visiblity, provide an event.
 */
export class ToggledVisibility extends SmartAppBannerEvent {
    static override readonly type = 'toggled-visibility';

    /** @internal */
    constructor() {
        super(ToggledVisibility.type, true);
    }
}
