import { CommonModule } from '@angular/common';
import { Component, output, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      class="relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none min-w-[120px] overflow-hidden group"
      [ngClass]="{
        'text-white': variant() === 'primary',
        'text-[#4F39F6] border border-[#4F39F6] hover:text-white': variant() === 'outline',
        'opacity-70 cursor-not-allowed': disabled()
      }"
    >
      <span class="absolute inset-0 bg-gradient-to-r from-[#4F39F6] via-[#A181FF] to-[#BD7CFF] opacity-0 group-hover:opacity-100 
             transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] scale-x-0 group-hover:scale-x-100 origin-left"></span>
      
      <span class="absolute inset-0 bg-[#4F39F6] opacity-100 group-hover:opacity-0 
             transition-opacity duration-500"></span>

      <span class="absolute inset-0 rounded-xl border-2 border-transparent 
             group-hover:border-[#A181FF] group-hover:scale-105
             transition-all duration-500 ease-out -z-10"></span>

      <span class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <span class="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/30 
               group-hover:animate-[pulse_2s_ease-in-out_infinite]"></span>
        <span class="absolute top-3/4 right-1/4 w-1.5 h-1.5 rounded-full bg-white/40 
               group-hover:animate-[pulse_3s_ease-in-out_infinite] delay-300"></span>
      </span>

      <span class="relative z-10 flex items-center gap-2 transform group-hover:scale-[1.02] transition-transform duration-300">
        @if (icon() && iconPosition() === 'left') {
          <mat-icon class="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-12">{{icon()}}</mat-icon>
        }

        <span class="whitespace-nowrap transition-all duration-300 group-hover:tracking-wide">{{text()}}</span>

        @if (icon() && iconPosition() === 'right') {
          <mat-icon class="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:-rotate-12">{{icon()}}</mat-icon>
        }
      </span>
    </button>
  `,
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'outline'>('primary');
  text = input('');
  icon = input<string | undefined>(undefined);
  iconPosition = input<'left' | 'right'>('left');
  disabled = input(false);

  onClick = output<Event>();
}