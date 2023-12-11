import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transfer } from 'src/app/interfaces/transfer';
import { ServiceService } from 'src/app/services/service.service';

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

  constructor( private router: Router,
                private service: ServiceService ) { 
    const today = new Date();
    const month = `${today.getMonth() + 1}`.padStart(2, '0'); // adiciona zero à esquerda se necessário
    const day = `${today.getDate()}`.padStart(2, '0');
    this.minDate = `${today.getFullYear()}-${month}-${day}`;
    this.formattedAmount = ""
  }

  ngOnInit(): void {
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
      sourceAccount: "xxxx",
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
