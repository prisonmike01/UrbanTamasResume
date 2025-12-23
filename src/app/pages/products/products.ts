// Angular
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

// Material
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// App
import { ProductFacade } from '../../core/services/product.facade';
import { ProductCard, } from '../../shared/components/product-card/product-card';
import { ProductsFilter } from '../../shared/components/products-filter/products-filter';
import { ProductFilter } from '../../shared/models/product.model';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard,
    ProductsFilter,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export default class Products {
  protected readonly facade = inject(ProductFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);

  protected readonly title = toSignal(this.route.title);

  // Search Logic
  protected readonly searchControl = new FormControl('');

  constructor() {
    // Connect search control to facade
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(value => value ?? '')
    ).subscribe(query => {
      this.facade.setSearchQuery(query);
    });
  }

  protected onPageChange(event: PageEvent) {
    this.facade.setPage(event.pageIndex, event.pageSize);
  }

  protected onFilterChange(filter: ProductFilter) {
    this.facade.updateFilter(filter);
  }

  protected onToggleFavorite(productId: number) {
    this.facade.toggleFavorite(productId);
    const product = this.facade.products().find(p => p.id === productId);
    const message = `${product?.name} ${(product?.favourite ? 'added to favorites' : 'removed from favorites')}`;
    
    this._snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
