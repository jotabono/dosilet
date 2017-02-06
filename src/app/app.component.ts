import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../pages/home/home';
import { Push, PushToken } from '@ionic/cloud-angular';
import { CatalogPage } from '../pages/catalog/catalog';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;

  constructor(platform: Platform, private http: Http, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
      // para navegar a cierta página al clicar en la notificación.
      // this.nav.push(CatalogPage);
        alert(msg.title + ': ' + msg.text);
      });
  }
}
