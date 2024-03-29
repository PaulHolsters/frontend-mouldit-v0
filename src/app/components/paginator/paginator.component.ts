import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Component as AbstractComponent} from "../Component"
import {TriggerType} from "../../enums/triggerTypes.enum";
import {Paginator} from "../../componentclasses/Paginator";
import {PropertyName} from "../../enums/PropertyNameTypes.enum";

@Component({
  selector: 'm-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent extends AbstractComponent implements OnInit,AfterViewInit  {
  @ViewChild('paginator') paginator:ElementRef|undefined
  calcHeight:string|undefined
  calcWidth:string|undefined
  ngOnInit(): void {
    this.props = Paginator.getProperties()
    this.props.forEach((v,k)=>{
      this.storeService.bindToStateProperty(this.name,k)?.subscribe(res=>{
        this.setPropValue(k,res)
        if(k==='border') debugger
      })
    })
    this.eventsService.triggerEvent(TriggerType.ComponentReady, this.name)
  }
  onPageChange(event:any){
    debugger
    this.trigger(TriggerType.PageChanged)
  }
  setCalculatedHeight(val:any):boolean{
    if(val){
      this.paginator?.nativeElement?.style?.setProperty('--heightVal','calc('+val+')')
      this.setPropValue(PropertyName.height,undefined)
      return true
    }
    this.setPropValue(PropertyName.height,'100%')
    return false
  }
  setCalculatedWidth(val:any):boolean{
    if(val){
      this.paginator?.nativeElement?.style?.setProperty('--widthVal','calc('+val+')')
      this.setPropValue(PropertyName.width,undefined)
      return true
    }
    this.setPropValue(PropertyName.width,'100%')
    return false
  }
  ngAfterViewInit(){
    this.setCalculatedHeight(this.getPropValue(PropertyName.calcHeight))
    this.setCalculatedWidth(this.getPropValue(PropertyName.calcWidth))
    this.calcHeight = this.getPropValue(PropertyName.calcHeight)
    this.calcHeight = this.getPropValue(PropertyName.calcHeight)
    if(this.element?.nativeElement.style){
      this.element.nativeElement.style = 'border-radius:0;'
    }
  }
}
