import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from 'src/app/modules/home/products/products.component';

@NgModule({
    declarations: [
        CategoriesComponent,
        HeaderComponent,
        ProductsComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
