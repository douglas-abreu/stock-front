import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-general',
  templateUrl: './filter-general.component.html',
  styleUrls: ['./filter-general.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class FilterGeneralComponent {
  form!: FormGroup;
  status!: FormGroup;
  @Input() filter: any = {};
  @Output() filterChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      keyword: [null],
    });

    this.form.patchValue(this.filter);
    this.createStatusForm();
  }

  createStatusForm() {
    this.status = this.fb.group({
      true: [this.filter.published],
      false: [this.filter.published == null ? null : !this.filter.published]
    });
  }

  search() {
    let statusValue = this.status.getRawValue();
    this.filter = this.form.getRawValue();
    (statusValue.true && statusValue.false) || (!statusValue.true && !statusValue.false)
      ? this.filter.published = null
      : statusValue.true
        ? this.filter.published = true
        : this.filter.published = false;
    Object.keys(this.filter).forEach(key => {
      if(this.filter[key] == null) delete this.filter[key];
    });
    this.filterChange.emit(this.filter);
  }

  resetForm() {
    this.form.reset();
    this.status.patchValue({true: false, false: false});
  }
}
