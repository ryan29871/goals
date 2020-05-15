import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });
    StatusBar.hide().catch((err) => {
      console.warn(err);
    });
    this.platform.ready().then(() => {
      console.log('Platform ready');
    });
  }

  ngOnInit() {
    this.platform.resume.subscribe(async () => {
      console.log('Platform resume');
    });
  }

}
