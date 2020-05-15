import { Injectable } from '@angular/core';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged = new Subject<boolean>();
  readonly loadingStateChangedOb$: Observable<boolean> = this.loadingStateChanged.asObservable();
  private loading: HTMLIonLoadingElement;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  async showToast(message: string, duration: number, position: 'top' | 'bottom' | 'middle', cssClass: string = '') {
    console.log('showtoast');
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      // showCloseButton: false,
      // closeButtonText: '',
      cssClass
    });
    toast.present();
  }

  async showAlert(header: string, message: string) {
    console.log('showAlert');
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: 'Ok', role: 'cancel' }],
    });
    await alert.present();
  }

  async showLoading(message: string) {
    console.log('showLoading');
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
    this.loading = await this.loadingController.create({
      message
    });
    return await this.loading.present();
  }

  async dismissLoading() {
    console.log('dismissLoading');
    if (this.loading) {
      return await this.loading.dismiss();
    }
  }


}
