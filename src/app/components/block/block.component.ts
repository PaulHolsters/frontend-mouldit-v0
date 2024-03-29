import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {RenderPropertiesService} from "../../services/renderProperties.service";

@Component({
  selector: 'm-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit, AfterViewInit {
  @Input() name = ''
  @Input() data:any|undefined
  @ViewChild('block') block:ElementRef|undefined
  backgroundColor$: Observable<any>|undefined
  calcHeight$: Observable<any>|undefined
  calcWidth$: Observable<any>|undefined
  width:string|undefined
  height:string|undefined
  constructor(private storeService:RenderPropertiesService, private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.backgroundColor$ = this.storeService.bindToStateProperty(this.name,'backgroundColor')
    this.calcWidth$ = this.storeService.bindToStateProperty(this.name,'calcWidth')
    this.calcHeight$ = this.storeService.bindToStateProperty(this.name,'calcHeight')
  }
  // todo zet deze methodes in een service aangezien je ze overal gebruikt
  setCalculatedHeight(val:any):boolean{
    if(typeof val === 'string'){
      this.block?.nativeElement.style?.setProperty('--heightVal','calc('+val+')')
      this.height = undefined
      return true
    }
    this.height = '100%'
    return false
  }
  setCalculatedWidth(val:any):boolean{
    if(typeof val === 'string'){
      this.block?.nativeElement.style?.setProperty('--widthVal','calc('+val+')')
      this.width = undefined
      return true
    }
    this.width = '100%'
    return false
  }
  ngAfterViewInit(): void {
    this.cd.detectChanges()
  }
}
