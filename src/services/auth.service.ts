import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredencaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    
    constructor(public http : HttpClient, public storage : StorageService) {

    }

    authenticate(creds : CredencaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
            {observe: 'response', responseType: 'text'}
        );
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let usr : LocalUser = {
            token: tok
        };
        this.storage.setLocalUser(usr);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}