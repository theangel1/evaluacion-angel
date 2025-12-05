import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-icon',
    imports: [CommonModule],
  template: `
    <span [innerHTML]="iconSvg"></span>
  `,
  styles: [
    `:host { display: inline-flex; }`
  ]
})
export class AppDynamicIcon implements OnChanges {
@Input() iconSet: string = '';
  @Input() iconName: string = '';
  @Input() size: string = '1.3rem';
  @Input() color: string = 'currentColor';

  icontest = '';
  iconSvg: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconSet'] || changes['iconName']) {
      this.loadIcon();
    }
  }

  private async loadIcon(): Promise<void> {
    if (!this.iconSet || !this.iconName) return

  try {
      // Normalizar el nombre del ícono para que coincida con el formato de importación
      const normalizedIconName = this.normalizeIconName(this.iconName);
      // Cargar dinámicamente el módulo de íconos según el conjunto especificado
      let iconModule;
      switch (this.iconSet) {
        case 'feather':
          iconModule = await import('@ng-icons/feather-icons');
          break;
        case 'hero':
        case 'heroicons':
          iconModule = await import('@ng-icons/heroicons/outline');
          break;
        case 'heroSolid':
          iconModule = await import('@ng-icons/heroicons/solid');
          break;
        case 'bootstrap':
          iconModule = await import('@ng-icons/bootstrap-icons');
          break;
        case 'material':
          iconModule = await import('@ng-icons/material-icons/outline');
          break;
        case 'materialSolid':
          iconModule = await import('@ng-icons/material-icons/baseline');
          break;
        case 'tabler':
          iconModule = await import('@ng-icons/tabler-icons');
          break;
        case 'fa':
        case 'fontawesome':
          iconModule = await import('@ng-icons/font-awesome/regular');
          break;
        case 'faSolid':
          iconModule = await import('@ng-icons/font-awesome/solid');
          break;
        case 'remixicon':
          iconModule = await import('@ng-icons/remixicon');
          break;
        default:
          console.error(`Conjunto de íconos no soportado: ${this.iconSet}`);
          return;
      }

      // Buscar el ícono en el módulo cargado
      const iconPrefix = this.getIconPrefix(this.iconSet);
      const iconKey = `${iconPrefix}${normalizedIconName}`;
      const icon = (iconModule as Record<string, any>)[iconKey];

      this.icontest = iconKey


      if (!icon) {
        console.error(`Ícono no encontrado: ${iconKey} en el conjunto ${this.iconSet}`);
        return;
      }

      // El ícono puede ser directamente el string SVG o un objeto con propiedades
    let svgContent: string;

    if (typeof icon === 'string') {
      // El ícono ya es el string del SVG
      svgContent = icon;
    } else if (icon.data) {
      // El ícono es un objeto con propiedad data
      svgContent = icon.data;
    } else if (icon.svg) {
      // Algunas librerías usan la propiedad svg
      svgContent = icon.svg;
    } else {
      // Si el ícono es un objeto, intentar obtener el contenido del path
      console.error('Estructura de ícono no reconocida:', icon);
      return;
    }

    // Extraer el contenido interno del SVG (sin las etiquetas <svg>)
    const svgInnerContent = this.extractSvgContent(svgContent);
      if (!svgInnerContent) {
      console.error('No se pudo extraer el contenido del SVG');
      return;
    }

    // Crear el SVG con los atributos deseados
     const svg = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="${this.size}"
      height="${this.size}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${this.color}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="display: inline-block; vertical-align: middle;"
    >${svgInnerContent}</svg>`;

    this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
  } catch (error) {
    console.error('Error al cargar el ícono:', error);
  }
  }

  private getIconPrefix(iconSet: string): string {
    switch (iconSet) {
      case 'feather': return 'feather';
      case 'hero':
      case 'heroicons': return 'hero';
      case 'heroSolid': return 'hero';
      case 'bootstrap': return 'bootstrap';
      case 'material': return 'mat';
      case 'materialSolid': return 'mat';
      case 'tabler': return 'tabler';
      case 'fa':
      case 'fontawesome': return 'fa';
      case 'faSolid': return 'fa';
      case 'remixicon': return 'remix';
      default: return '';
    }
  }

  private normalizeIconName(name: string): string {
    return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  }

  private extractSvgContent(svgString: string): string {
  // Extraer solo el contenido interno del SVG
  const match = svgString.match(/<svg[^>]*>(.*?)<\/svg>/s);
  return match ? match[1] : svgString;
}
}
