import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

    step: number = 1;

    constructor(private router: Router) { }

    ngOnInit() { }

    login(): void {
        if (this.step === 1) {
            this.step = 2;
        } else if (this.step === 2) {
            this.router.navigate(['/home']);
        }
    }

}
