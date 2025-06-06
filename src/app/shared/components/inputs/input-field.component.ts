import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports:[CommonModule,FormsModule],
  template: `
    <div class="mb-4" [class.opacity-50]="disabled">
      @if (label) {
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ label }}
          @if (required) {
            <span class="text-red-500">*</span>
          }
        </label>
      }
      
      <div class="relative rounded-md shadow-sm">
        @if (prefixIcon) {
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {{ prefixIcon }}
          </div>
        }
        
        <input
          class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          [class.pl-10]="prefixIcon"
          [class.pr-10]="suffixIcon"
          [class.border-red-300]="hasError()"
          [class.bg-gray-50]="readonly || disabled"
          [type]="type"
          [placeholder]="getPlaceholder()"
          [readonly]="readonly"
          [disabled]="disabled"
          [value]="formattedValue"
          (input)="onInputChange($event)"
          (blur)="validateInput()"
          (keydown)="onKeyDown($event)"
        >
        
        @if (suffixIcon) {
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {{ suffixIcon }}
          </div>
        }
      </div>
      
      @if (hint && !hasError()) {
        <p class="mt-1 text-sm text-gray-500">{{ hint }}</p>
      }
      @if (hasError()) {
        <p class="mt-1 text-sm text-red-600">{{ getErrorMessage() }}</p>
      }
    </div>
  `,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hint: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() mask: 'fecha' | 'email' | 'none' = 'none';
  @Input() dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy' = 'dd/mm/yyyy';

  value: any = '';
  formattedValue: string = '';
  isValid: boolean = true;
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['mask'] || changes['dateFormat']) {
      this.formatValue();
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.formatValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.applyMask(value);
  }

  validateInput() {
    this.onTouched();
    
    if (this.mask === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValid = emailRegex.test(this.value);
    } else {
      this.isValid = true;
    }
  }

  hasError(): boolean {
    return (!this.isValid || (this.required && !this.value)) && this.onTouched();
  }

  getErrorMessage(): string {
    if (!this.isValid && this.mask === 'email') {
      return 'Ingrese un correo electrónico válido';
    }
    if (this.required && !this.value) {
      return 'Este campo es requerido';
    }
    return '';
  }

onKeyDown(event: KeyboardEvent) {
  if (this.mask === 'fecha') {
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(event.key)) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    const currentValue = input.value.replace(/\D/g, '');
    
    if (currentValue.length >= 8 && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
  }
}

  getPlaceholder(): string {
    if (this.placeholder) return this.placeholder;
    
    switch (this.mask) {
      case 'fecha': 
        return this.dateFormat === 'dd/mm/yyyy' ? 'DD/MM/AAAA' : 'MM/DD/AAAA';
      case 'email':
        return 'ejemplo@dominio.com';
      default: return '';
    }
  }

  private formatValue() {
    if (!this.value) {
      this.formattedValue = '';
      return;
    }

    switch (this.mask) {
      case 'fecha':
        this.formattedValue = this.formatFecha(this.value);
        break;
      default:
        this.formattedValue = this.value;
    }
  }

private applyMask(value: string) {
  let rawValue = value;
  
  switch (this.mask) {
    case 'fecha':
      rawValue = this.removeMask(value);
      this.value = rawValue.slice(0, 8);
      this.formattedValue = this.formatFecha(this.value);
      break;
    case 'email':
      this.value = value;
      this.formattedValue = value;
      break;
    default:
      this.value = value;
      this.formattedValue = value;
  }

  this.onChange(this.value);
}

private formatFecha(value: string): string {
  if (!value) return '';
  
  const numbers = value.replace(/\D/g, '');
  
  if (this.dateFormat === 'dd/mm/yyyy') {
    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);

    let formatted = '';
    if (day) formatted += `${day}`;
    if (month) formatted += `/${month}`;
    if (year) formatted += `/${year.slice(0, 4)}`;

    return formatted;
  } else {
    const month = numbers.slice(0, 2);
    const day = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);

    let formatted = '';
    if (month) formatted += `${month}`;
    if (day) formatted += `/${day}`;
    if (year) formatted += `/${year.slice(0, 4)}`;

    return formatted;
  }
}

  private removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }
}