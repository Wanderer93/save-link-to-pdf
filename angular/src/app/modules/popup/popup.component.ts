import { CommonModule } from '@angular/common'
import { Component, Inject, signal, OnInit } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'

@Component({
    selector: 'app-popup',
    imports: [CommonModule],
    templateUrl: 'popup.component.html',
    styleUrls: ['popup.component.scss']
})
export class PopupComponent implements OnInit {
  message = signal('')
  saveStatus: ('Saved' | 'Existing'| 'None') = 'None';

  constructor(@Inject(TAB_ID) readonly tabId: number) {}

  saveCurrentTab() {
    chrome.tabs.get(this.tabId, (tab) => {
      if (tab && tab.url) {
        chrome.storage.local.get({savedUrls:[]}, (result)=> {
          const savedUrls = result['savedUrls'] as string[];
          if (savedUrls.includes(tab.url)) {
            console.log('Duplicate URL, not saved:', tab.url);
            this.saveStatus = 'Existing';
            return;
          }
          savedUrls.push(tab.url!); 
          console.log('Saved URL:', tab.url!);
          this.saveStatus = 'Existing';
          chrome.storage.local.set({savedUrls});
        })
      }
    })
  }

  onClick() {
    this.saveCurrentTab();
    chrome.tabs.sendMessage(this.tabId, 'request', (msg) => {
      this.message.set(
        chrome.runtime.lastError
          ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
          : msg
      )
    })
  }

  ngOnInit() {
    this.saveCurrentTab();
  }
}
