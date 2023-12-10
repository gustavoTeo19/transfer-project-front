import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  transfer: any = {
    sourceAccount: '',
    destinationAccount: '',
    transferDate: '',
    transferAmount: ''
  }

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }
  
  create(): void {
    this.router.navigate(['/home'])
  }
  cancel(): void {
    this.router.navigate(['/home'])
  }

}
