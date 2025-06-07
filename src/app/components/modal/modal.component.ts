import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transfer } from 'src/app/interfaces/transfer';
import { ServiceService } from 'src/app/services/service.service';
import { FavoriteService, Favorite } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  minDate: string;
  formattedAmount: string;

  transfer: Transfer = {
    sourceAccount: '',
    destinationAccount: '',
    transferDate: '',
    transferAmount: 0
  }

  favoritos: Favorite[] = [];
  contasFiltradas: Favorite[] = [];
  mostrarBotaoFavoritar: boolean = false;
  user: string = "";

  constructor( private router: Router,  private favoriteService: FavoriteService,
                private service: ServiceService ) { 
    const today = new Date();
    const month = `${today.getMonth() + 1}`.padStart(2, '0'); // adiciona zero à esquerda se necessário
    const day = `${today.getDate()}`.padStart(2, '0');
    this.minDate = `${today.getFullYear()}-${month}-${day}`;
    this.formattedAmount = ""
  }

  ngOnInit(): void {
    this.user = this.service.getUserFromToken() || '';
    this.favoriteService.getFavorites(this.user).subscribe(favs => this.favoritos = favs); // use o ID real do usuário
    
    console.log('Usuário logado:', this.user);
  }

  usarConta(conta: string): void {
    this.transfer.destinationAccount = conta;
    this.contasFiltradas = [];
    this.mostrarBotaoFavoritar = false;
  }

  favoritarConta(): void {
    const conta = this.transfer.destinationAccount || '';
    const nome = prompt('Digite um nome para essa conta favorita:');

    if (!nome || conta.trim() === '') return;


    const novoFav: Favorite = {
      userId: this.user, 
      contaDestino: conta,
      nomeFavorito: nome
    };

    this.favoriteService.saveFavorite(novoFav).subscribe(() => {
      alert('Conta salva como favorita!');
      this.favoriteService.getFavorites(this.user).subscribe(favs => this.favoritos = favs);
      this.mostrarBotaoFavoritar = false;
    });
  }

  onContaInput(value: string): void {
    this.transfer.destinationAccount = value;

    this.contasFiltradas = this.favoritos.filter(f =>
      f.contaDestino.toLowerCase().includes(value.toLowerCase())
    );

    this.mostrarBotaoFavoritar =
      value.length > 2 &&
      !this.favoritos.some(f => f.contaDestino === value);
  }
  
  convertToDateWithTime(dateString: string): string {
    console.log(dateString);
    
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString(); // Isso retornará algo como "2023-12-29T00:00:00.000Z"
  }
  
  onAmountInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.transfer.transferAmount = parseFloat(value.replace(/[^0-9\.]/g, ''));
    this.formattedAmount = `R$ ${this.transfer.transferAmount.toFixed(2)}`;
  }
  
  validateNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9.,]/g, '').replace(/(\..*?)\..*/g, '$1');
  }
  create(): void {
    console.log();
    
    var body = {
       sourceAccount: this.user,
     // sourceAccount: "!",
      destinationAccount: this.transfer.destinationAccount,
      transferDate: this.convertToDateWithTime(this.transfer.transferDate),
      transferAmount: this.transfer.transferAmount
    }

    this.service.create(body).subscribe(() => {
      this.router.navigate(['/home'])
    },
    (error) => {
      alert(error.error)

    })
  }
  cancel(): void {
    this.router.navigate(['/home'])
  }

}
