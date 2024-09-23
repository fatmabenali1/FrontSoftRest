import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user';
import { Utilisateur } from './models/utilisateur.model';
import { Role } from './enums/role.enum';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  user?: Utilisateur | null;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get isCOLLABORATEUR() {
        return this.user?.role === Role.COLLABORATEUR;
    }

    logout() {
        this.authenticationService.logout();
    }
    isAuthenticated(){
      return this.authenticationService.userValue 
    }
}
