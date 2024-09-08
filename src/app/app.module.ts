import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProyectosComponent } from './productos/proyectos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetalleDelProductoComponent } from './detalle-del-producto/detalle-del-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { DatosDelUsuarioComponent } from './datos-del-usuario/datos-del-usuario.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';
import { TipoDeEntregaComponent } from './tipo-de-entrega/tipo-de-entrega.component';
import { PagarComponent } from './pagar/pagar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ProyectosComponent,
    NosotrosComponent,
    ContactoComponent,
    LoginComponent,
    RegisterComponent,
    DetalleDelProductoComponent,
    CartComponent,
    DatosDelUsuarioComponent,
    ComprobanteComponent,
    TipoDeEntregaComponent,
    PagarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
