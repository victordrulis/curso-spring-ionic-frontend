import { AuthService } from './../../services/auth.service';
import { CredencaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    creds : CredencaisDTO = {
        email: "",
        senha: ""
    };

    constructor(
        public navCtrl: NavController, 
        public menu: MenuController,
        public auth: AuthService
    ) {

    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewDidLeave() {
        this.menu.swipeEnable(true);
    }

    login() {
        this.auth.authenticate(this.creds)
            .subscribe(response => {
                console.log(response.headers.get('Authorization'));
                this.navCtrl.setRoot('CategoriasPage');
            },
            error => {}
        );
    }

}
