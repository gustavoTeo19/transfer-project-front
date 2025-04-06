import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    email: '',
    password: '',
    name:''
  };

  mensagem: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
  register(): void {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log(response)
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err)
        this.mensagem = 'Erro ao cadastrar. Verifique os dados ou tente outro usuário.';
      }
    });
  }
}
