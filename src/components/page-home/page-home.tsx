import { Component, Fragment, h } from '@stencil/core'

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {

  render() {
    return (
      <Fragment>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Night Driver Strip</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-gid fixed>

          </ion-gid>
        </ion-content>
      </Fragment>
    )
  }
}
