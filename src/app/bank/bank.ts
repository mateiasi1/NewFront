import { Component, OnInit } from '@angular/core';
import { BankAccount, Bank } from '../bank.component';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { Currency, CurrencyList } from '../bankAccount/currency.component';
import { CryptoAccount, Crypto } from '../crypto.component';
import { CurrencyListCrypto } from '../cryptoAccount/cryptoCurrency.component';

@Component({
  selector: 'app-fiat-account',
  templateUrl: './bank.html',
  styleUrls: ['./bank.css']
})
export class BankComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'BankName', 'IBAN', 'Currency', 'Actions'];
  displayedColumnsCrypto: string[] = ['Id', 'CryptoName', 'Actions'];
  constructor(private http: HttpClient) { }

  dataSource: MatTableDataSource<Bank>;
  dataSourceCrypto: MatTableDataSource<Crypto>;

  public bankAccounts: Bank[] = [];
  public cryptoAccounts: Crypto[] = [];

  UserId: number = 0;
  BankName: string;
  IBAN: string;
  CurrencyAbbreviation: string;

  CryptoName: string;
  Refference: string;

  panelOpenState = false;
  public  currencyList: CurrencyList[] = [];
  public  cryptoList: CurrencyListCrypto[] = [];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.bankAccounts);
    this.dataSourceCrypto = new MatTableDataSource(this.cryptoAccounts);
    this.getCurrencies();
    this.getCryptoCurrencies();
    this.getBanks();
    this.getCrypto();
  }
  // #region Bank
  getBanks() {
    this.http.get('https://localhost:44384/api/Banks').subscribe((responseData: Bank[]) => {
      this.bankAccounts = responseData;
      debugger;
      this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  addBank() {
    const bankToAdd: Bank = {id: 0, bankName: this.BankName, iban: this.IBAN, currencyName: '', currencyAbbreviation: this.CurrencyAbbreviation }

    this.http.post('https://localhost:44384/api/Banks', bankToAdd).subscribe((responseData: Bank[]) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  deleteBank(id: number) {
    this.http.delete('https://localhost:44384/api/Banks/' + id).subscribe((responseData: Bank[]) => {
      this.bankAccounts = responseData;
       this.dataSource = new MatTableDataSource(responseData);
      console.log(responseData);
  });
  }
  // #endregion

  // #region Currency
  getCurrencies() {
    this.http.get('https://localhost:44384/api/Currencies').subscribe((responseData: CurrencyList[]) => {
      this.currencyList = responseData;
      console.log(responseData);
    });
  }

  getCryptoCurrencies() {
    this.http.get('https://localhost:44384/api/CryptoCurrencies').subscribe((responseData: CurrencyListCrypto[]) => {
      this.cryptoList = responseData;
      console.log(responseData);
    });
  }
  // #endregion

  // #region Bank to Bank Account
  addBankAccount(id: number, currencyName: string, bankName: string, iban: string) {
    // tslint:disable-next-line: max-line-length
    const accountToAdd: BankAccount = {id: 0, idUser: this.UserId, idCurrency: 0, currencyName: currencyName, idBank: id, bankName: bankName, iban: iban, sold: 0};
    debugger;
    this.http.post('https://localhost:44384/api/BankAccounts', accountToAdd).subscribe((responseData: BankAccount[]) => {
      debugger;
      console.log(responseData);
    });
  }
  // #endregion
 
 // #region Crypto to Crypto Account
    addCryptoAccount(id: number, cryptoCurrencyName: string, cryptoName: string, refference: string) {
    // tslint:disable-next-line: max-line-length
    const cryptoAccountToAdd: CryptoAccount = {id: 0, idUser: this.UserId, idCryptoCurrency: 0, cryptoCurrencyName: cryptoCurrencyName, idCrypto: id, cryptoName: cryptoName, refference: ' ', sold: 0};
    debugger;
    this.http.post('https://localhost:44384/api/CryptoAccount', cryptoAccountToAdd).subscribe((responseData: CryptoAccount[]) => {
      debugger;
      console.log(responseData);
    });
    }
  // #endregion

  // #region Crypto
  getCrypto() {
    this.http.get('https://localhost:44384/api/Crypto').subscribe((responseData: Crypto[]) => {
      this.cryptoAccounts = responseData;
      debugger;
      this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  addCrypto() {
    const cryptoToAdd: Crypto = {id: 0, cryptoName: this.CryptoName, refference: this.Refference, cryptoCurrencyName: this.CryptoName, cryptoCurrencyAbbreviation: '' }

    this.http.post('https://localhost:44384/api/Crypto', cryptoToAdd).subscribe((responseData: Crypto[]) => {
      // de adaugat aici si de retrivuit din backend in lista ca in available
      this.cryptoAccounts = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
    });
  }

  deleteCrypto(id: number) {
    this.http.delete('https://localhost:44384/api/Crypto/' + id).subscribe((responseData: Crypto[]) => {
      this.cryptoAccounts = responseData;
       this.dataSourceCrypto = new MatTableDataSource(responseData);
      console.log(responseData);
  });
  }
  // #endregion
}