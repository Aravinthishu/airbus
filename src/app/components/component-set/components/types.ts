export type ComponentId =
  | 'button'
  | 'buttongroup'
  | 'fab'
  | 'inputfield'
  | 'textarea'
  | 'checkbox'
  | 'datepicker'
  | 'breadcrumbs'
  | 'tabs'
  | 'sidenav'
  | 'accordion'
  | 'avatar'
  | 'datatable'
  | 'card'
  | 'banner';

export type Status = 'pass' | 'warn' | 'fail';

export interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  color: string;
  tint: string;
  desc: string;
  items: ComponentId[];
}

export interface ComponentDef {
  name: string;
  cat: string;
  pass: number;
  total: number;
  status: Status;
  desc: string;
}

export interface A11yCheck {
  code: string;
  name: string;
  status: Status;
  value: string;
  note: string;
}
