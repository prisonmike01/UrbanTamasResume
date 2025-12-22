import { Component, input } from '@angular/core';

@Component({
  selector: 'app-filter-section',
  imports: [],
  templateUrl: './filter-section.html',
  styleUrl: './filter-section.scss',
})
export class FilterSection {
  public readonly title = input<string>();
}
