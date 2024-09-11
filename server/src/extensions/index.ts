Array.prototype.empty = function (): boolean {
    return this.length === 0;
};

String.prototype.toTitleCase = function (): string {
    return this.replace(/([A-Z])/g, ' $1').replace(/^./, (match: string) => match.toUpperCase());
};
