import { TemplateRef, Type } from '@angular/core';

export interface BaseModalArgs {
  title?: string;
  description?: string;
  modalClass?: 'modal-xs' | 'modal-sm' | 'modal-md' | 'modal-lg' | 'modal-xl';
}

export interface BaseModalFormArgs {
  title?: string;
  param?: any;
  showFooter?: boolean;
  primaryActionName?: string;
  modalClass?: 'modal-xs' | 'modal-sm' | 'modal-md' | 'modal-lg' | 'modal-xl' | 'modal-full';
}
