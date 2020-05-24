import { Component } from '@angular/core';
import { CryptoAccountService } from 'src/app/services/cryptoAccount.service';
import { CryptoAccountComponent } from './crypto-account.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'trade.html',
})
export class TradeCryptoComponent {
  constructor(public cryptoAccountService: CryptoAccountService) { }
}
