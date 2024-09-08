import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo-de-entrega',
  templateUrl: './tipo-de-entrega.component.html',
  styleUrls: ['./tipo-de-entrega.component.css']
})
export class TipoDeEntregaComponent {
  activeSection: 'delivery' | 'pickup' = 'delivery';

  setActiveSection(section: 'delivery' | 'pickup') {
    this.activeSection = section;
  }

  isActive(section: 'delivery' | 'pickup'): boolean {
    return this.activeSection === section;
  }
}
