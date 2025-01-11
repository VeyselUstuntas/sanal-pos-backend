export enum DtoPrefix {}

export enum ValidationType {
  IS_NOT_EMPTY = 'IS_NOT_EMPTY',
  MUST_BE_NUMBER = 'MUST_BE_NUMBER',
  MUST_BE_STRING = 'MUST_BE_STRING',
  MAX_LENGTH = 'MAX_LENGTH',
  MIN_LENGTH = 'MIN_LENGTH',
  NOT_STRONG = 'NOT_STRONG',
  NOT_VALID = 'NOT_VALID',
}

export function getValidationMessages(
  prefix: DtoPrefix,
  validationType: ValidationType,
  ...args: any
): string {
  const message = `${prefix}_${validationType}${args.length > 0 ? '|' + args.join('|') : ''}`;
  return message;
}
