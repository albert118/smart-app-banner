import { TypedEvent } from '@lib/TypedEventTarget';
import type { SmartAppBanner } from '../smartappbanner';

export type SmartAppBannerEvents = ReadyEvent | DestroyedEvent;

/**
 * Base class for all events dispatched by {@link SmartAppBanner}
 */
export abstract class SmartAppBannerEvent extends TypedEvent<SmartAppBanner> {}

/**
 * @event Triggered once the smart app banner is ready.
 */
export class ReadyEvent extends SmartAppBannerEvent {
    static override readonly type = 'ready';
    override type: 'ready';

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
    override type: 'destroyed';

    /** @internal */
    constructor() {
        super(DestroyedEvent.type, true);
    }
}
