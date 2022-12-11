import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {

    selectType: number = 1;
    selected: string = '';
    selectedColor: string = '';

    selectedColors = {
        shirt: '',
        pant: ''
    };

    constructor(private router: Router) { }

    onSelect(color: any): void {
        this.selected = color.color;
        this.selectedColor = color.code;
    }

    selectColor(): void {
        if (this.selectType === 1) {
            this.selectType = 2;
            this.selectedColors.shirt = this.selectedColor;
        } else if (this.selectType === 2) {
            this.selectedColors.pant = this.selectedColor;
            localStorage.setItem('colors', JSON.stringify(this.selectedColors));
            this.router.navigate(['/product']);
        }

        this.selected = '';
    }

}
