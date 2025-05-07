export {};

declare global {
    interface String {
        isFalsishOrEmpty: () => boolean;
    }
}

String.prototype.isFalsishOrEmpty = function () {
    return !this.trim();
};
