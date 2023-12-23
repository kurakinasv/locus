export type OptionType<TValue extends string | number> = {
  value: TValue;
  label: string;
};

export enum SizeEnum {
  s = 's',
  m = 'm',
  xl = 'xl',
}
