import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TuiRoot } from '@taiga-ui/core';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, TuiRoot],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {}
