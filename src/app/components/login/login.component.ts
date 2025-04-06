import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
  }
  user: User = {
    email: '',
    password: ''
  };

  mensagem: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
  login(): void {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Credenciais inválidas.');
        } else if (err.status === 404) {
          alert('Usuário não encontrado.');
        } else {
          alert('Erro ao tentar logar. Tente novamente mais tarde.');
        }
      }
    });
  }
  irParaCadastro(): void {
    this.router.navigate(['/register']);
  }
}
