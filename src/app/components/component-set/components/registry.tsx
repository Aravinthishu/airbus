'use client';
import React from 'react';
import { ComponentId } from '../types';
import { ButtonDemo, ButtonSpec } from './button';
import { ButtonGroupDemo, ButtonGroupSpec } from './button-group';
import { FabDemo, FabSpec } from './fab';
import { InputFieldDemo, InputFieldSpec } from './input-field';
import { TextAreaDemo, TextAreaSpec } from './text-area';
import { CheckboxDemo, CheckboxSpec } from './checkbox';
import { DatePickerDemo, DatePickerSpec } from './date-picker';
import { BreadcrumbsDemo, BreadcrumbsSpec } from './breadcrumbs';
import { TabsDemo, TabsSpec } from './tabs';
import { SideNavDemo, SideNavSpec } from './sidenav';
import { AccordionDemo, AccordionSpec } from './accordion';
import { AvatarDemo, AvatarSpec } from './avatar';
import { DataTableDemo, DataTableSpec } from './data-table';
import { CardDemo, CardSpec } from './card';
import { BannerDemo, BannerSpec } from './banner';

export function LiveDemo({ id }: { id: ComponentId }) {
  switch (id) {
    case 'button': return <ButtonDemo />;
    case 'buttongroup': return <ButtonGroupDemo />;
    case 'fab': return <FabDemo />;
    case 'inputfield': return <InputFieldDemo />;
    case 'textarea': return <TextAreaDemo />;
    case 'checkbox': return <CheckboxDemo />;
    case 'datepicker': return <DatePickerDemo />;
    case 'breadcrumbs': return <BreadcrumbsDemo />;
    case 'tabs': return <TabsDemo />;
    case 'sidenav': return <SideNavDemo />;
    case 'accordion': return <AccordionDemo />;
    case 'avatar': return <AvatarDemo />;
    case 'datatable': return <DataTableDemo />;
    case 'card': return <CardDemo />;
    case 'banner': return <BannerDemo />;
    default: return null;
  }
}

export function SpecSheet({ id }: { id: ComponentId }) {
  switch (id) {
    case 'button': return <ButtonSpec />;
    case 'buttongroup': return <ButtonGroupSpec />;
    case 'fab': return <FabSpec />;
    case 'inputfield': return <InputFieldSpec />;
    case 'textarea': return <TextAreaSpec />;
    case 'checkbox': return <CheckboxSpec />;
    case 'datepicker': return <DatePickerSpec />;
    case 'breadcrumbs': return <BreadcrumbsSpec />;
    case 'tabs': return <TabsSpec />;
    case 'sidenav': return <SideNavSpec />;
    case 'accordion': return <AccordionSpec />;
    case 'avatar': return <AvatarSpec />;
    case 'datatable': return <DataTableSpec />;
    case 'card': return <CardSpec />;
    case 'banner': return <BannerSpec />;
    default: return null;
  }
}
