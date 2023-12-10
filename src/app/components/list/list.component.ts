import { Component, OnInit } from '@angular/core';
import { BackendReturn, Transfer } from 'src/app/interfaces/transfer';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  listTransfer: Transfer[] = []; 

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.list();
  }

  formatarComoDinheiro(valor: number) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

  formatarData(dataISO: string) {
    const data = new Date(dataISO);
    return data.toISOString().split('T')[0];
  }



  list() {
    this.service.list().subscribe((listTransfer: BackendReturn) => {
      console.log(listTransfer.content)
      this.listTransfer = listTransfer.content;
    })
  }

}
