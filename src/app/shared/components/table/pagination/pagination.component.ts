import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Pagination } from '../../../interfaces/media';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination!: Pagination;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  paginationCollapse: boolean = false;

  ngOnInit(): void {
    this.pagination.numberOfPages > 5 ? this.paginationCollapse = true : ""; 
  }

  emitPage(page: number) { 
    this.pageChange.emit(page);
  }
}
