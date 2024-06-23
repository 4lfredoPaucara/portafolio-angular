import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(  public _servicio: InfoPaginaService,
                private router: Router ){
    
  }

  buscarProducto( terminio: string ){
    if(terminio.length < 1){
      return;
    }
    this.router.navigate(['/search', terminio]);
    // console.log(terminio);
    
  }

}
