import { Component, Input, OnChanges, ViewChild, Renderer2, ElementRef } from '@angular/core';

declare var require: any;

let jsbarcode = require('jsbarcode');

@Component({
  selector: 'ngx-barcode',
  template: `<div #bcElement [class]="cssClass"></div>`,
  styles: []
})
export class NgxBarcodeComponent implements OnChanges {

  // @Input() elementType: "svg"|"img"|"canvas"="svg";
  @Input('bc-class') cssClass = 'barcode'; // this should be done more elegantly

  @Input('bc-format') format = 'CODE128';
  @Input('bc-line-color') lineColor = '#000000';
  @Input('bc-width') width = 2;
  @Input('bc-height') height = 100;
  @Input('bc-display-value') displayValue = false;
  @Input('bc-font-options') fontOptions = '';
  @Input('bc-font') font = 'monospace';
  @Input('bc-text-align') textAlign = 'center';
  @Input('bc-text-position') textPosition = 'bottom';
  @Input('bc-text-margin') textMargin = 2;
  @Input('bc-font-size') fontSize = 20;
  @Input('bc-background') background = '#ffffff';
  @Input('bc-margin') margin = 10;
  @Input('bc-margin-top') marginTop = 10;
  @Input('bc-margin-bottom') marginBottom = 10;
  @Input('bc-margin-left') marginLeft = 10;
  @Input('bc-margin-right') marginRight = 10;
  @Input('bc-value') value = '';
  @ViewChild('bcElement') bcElement: ElementRef;

  @Input('bc-valid') valid: () => boolean = () => true;


  get options() {
    return {
      format: this.format,
      lineColor: this.lineColor,
      width: this.width,
      height: this.height,
      displayValue: this.displayValue,
      fontOptions: this.fontOptions,
      font: this.font,
      textAlign: this.textAlign,
      textPosition: this.textPosition,
      textMargin: this.textMargin,
      fontSize: this.fontSize,
      background: this.background,
      margin: this.margin,
      marginTop: this.marginTop,
      marginBottom: this.marginBottom,
      marginLeft: this.marginLeft,
      marginRight: this.marginRight,
      valid: this.valid,
    };
  }
  constructor(private renderer: Renderer2) { }

  ngOnChanges() {
    this.createBarcode();
  }

  createBarcode() {
    if (!this.value) { return; };
    let element: SVGElement = this.renderer.createElement('svg', 'svg') as SVGElement;

    jsbarcode(element, this.value, this.options);
    this.bcElement.nativeElement.innerHTML = element.outerHTML;
  }

}
