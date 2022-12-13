import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    
    appName: string = 'E Commerce';

    constructor(private router: Router) { }

    redirect(url: string): void {
        this.router.navigate([url]);
    }
}
