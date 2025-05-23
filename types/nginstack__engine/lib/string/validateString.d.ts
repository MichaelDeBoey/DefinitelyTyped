export = validateString;
declare function validateString(
    value: any,
    type: any,
    max?: number | Date,
    min?: number | Date,
    caseType?: string,
    classKey?: number,
    dateFormat?: DateFormat,
    ...args: any[]
): any;
declare namespace validateString {
    export { registerType, DateFormat };
}
declare function registerType(type: string | string[], handler: any): void;
type DateFormat = import('../date/DateFormat').DateFormatType;
