import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.sass'],
  standalone: true,
  imports: [CommonModule],
})
export class PageSizeComponent {
  @Input() pageSize?: number;
  activeDropdown?: HTMLElement | undefined;
  buttons?: HTMLElement | undefined
  isVisiblePageSize = false;
  @Output() pageSizeChange = new EventEmitter<number>();

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageSizeChange.emit(this.pageSize);
  }

  toggle(){
    this.isVisiblePageSize = !this.isVisiblePageSize;
	}
}
