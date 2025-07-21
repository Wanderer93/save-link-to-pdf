import { CommonModule } from '@angular/common'
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'

@Component({
    selector: 'app-tab',
    imports: [CommonModule],
    templateUrl: 'tab.component.html',
    styleUrls: ['tab.component.scss']
})
export class TabComponent implements OnInit {
    savedUrls: string[]=[];

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        chrome.storage.local.get({ savedUrls: []}, (result) => {
            this.savedUrls = result['savedUrls'];
            this.cdr.detectChanges();
        });
        chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes['savedUrls']) {
        this.savedUrls = changes['savedUrls'].newValue || [];
        this.cdr.detectChanges();
        }
        });
    }
}
