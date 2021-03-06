import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ValidateAccountComponent } from './validate-account/validate-account.component';
import { Page404Component } from './page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/LoginComponent';
import { ManageApplicationComponent } from './portal/manage-application/manage-application.component';
import { AuthService } from './services/auth-service';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginService } from './services/login.service';
import { RoleGuardService } from './services/role-guad.service';
import { TokenInterceptor } from './components/token-nterceptor';
import { BankAccountService } from './services/bankAccount.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const modules = [
  MatCardModule,
  FormsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  HttpClientModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SetPasswordComponent,
    ValidateAccountComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...modules
  ],
  exports: [...modules],
  providers: [
    ManageApplicationComponent,
    AuthService,
    AuthGuardService,
    LoginService,
    RoleGuardService,
    BankAccountService,
    { provide: HTTP_INTERCEPTORS,
       useClass: TokenInterceptor,
       multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
