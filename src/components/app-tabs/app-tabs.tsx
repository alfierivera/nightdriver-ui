import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-tabs',
  styleUrl: 'app-tabs.css',
  // shadow: true,
})
export class AppTabs {

  render() {
    return (
      <ion-tabs>
        <ion-tab tab="tab-home">
          <ion-nav></ion-nav>
        </ion-tab>
        <ion-tab tab="tab-notice">
          <ion-nav></ion-nav>
        </ion-tab>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab-home">
            <ion-icon name="stats-chart-outline"></ion-icon>
            <ion-label>Statistics</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab-notice" disabled>
            <ion-icon name="color-palette-outline"></ion-icon>
            <ion-label>Effects</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab-notice" disabled>
            <ion-icon name="cog-outline"></ion-icon>
            <ion-label>Configuration</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    );
  }

}
