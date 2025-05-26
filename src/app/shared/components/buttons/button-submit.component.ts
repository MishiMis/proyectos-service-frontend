import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-submit',
  imports:[CommonModule, MatIconModule],
  template: `
<button
      [type]="type"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
      class="relative overflow-hidden group rounded-lg px-6 py-3 font-medium transition-all duration-300 ease-out
             disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
             focus-visible:ring-[#A181FF] focus-visible:ring-opacity-50 flex items-center justify-center"
      [ngClass]="{
        'bg-gradient-to-r from-[#4F39F6] via-[#A181FF] to-[#BD7CFF] text-white shadow-lg hover:shadow-xl': variant === 'primary',
        'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50': variant === 'secondary'
      }"
    >
      <span class="absolute inset-0 bg-gradient-to-r from-[#4F39F6]/0 via-[#A181FF]/20 to-[#BD7CFF]/0 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      
      <span class="relative flex items-center gap-2">
        @if (icon && iconPosition === 'left') {
          <mat-icon class="!w-5 !h-5 !text-[1.2rem]">{{icon}}</mat-icon>
        }
        {{ label }}
        @if (icon && iconPosition === 'right') {
          <mat-icon class="!w-5 !h-5 !text-[1.2rem]">{{icon}}</mat-icon>
        }
      </span>
      
      @if (loading) {
        <span class="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <mat-icon class="animate-spin !w-5 !h-5">autorenew</mat-icon>
        </span>
      }
    </button>
  `,
  standalone: true
})
export class ButtonSubmitComponent {
  @Input() label: string = 'Button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Output() onClick = new EventEmitter<Event>();
}