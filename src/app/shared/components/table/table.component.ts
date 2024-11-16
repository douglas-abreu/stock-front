import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.sass'],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class TableComponent {
	isVisibleFilter = false;
	@Input() titles: string[] = [];
	@Input() data: any;
  @Input() hasEdit = true;
  @Input() hasDelete = true;
  @Input() hasFilter = true;

	toggle(){
		this.isVisibleFilter = !this.isVisibleFilter;
	}
}
