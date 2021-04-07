export interface IDpDateRangPicker {
  format?: string;
  showButtons?: boolean;
  value?: Array<any>;
  onChange?(value?: Array<any>): void;
}
