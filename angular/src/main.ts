import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter, withHashLocation } from '@angular/router'
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const { id: tabId } = [...tabs].pop();
  const config = appConfig(tabId);
  config.providers = [
    provideRouter(routes, withHashLocation()),
    ...(config.providers || [])
  ];
  bootstrapApplication(AppComponent, config).catch((err) => console.error(err));
});
