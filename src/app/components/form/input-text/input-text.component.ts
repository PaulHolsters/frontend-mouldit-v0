import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {IconPositionType} from "../../../enums/iconPositionType.enum";
import {IconType} from "../../../enums/iconType.enum";
import {Component as AbstractComponent} from "../../Component"
import {PropertyName} from "../../../enums/PropertyNameTypes.enum";
import {TextInput} from "../../../componentclasses/TextInput";

@Component({
  selector: 'm-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent extends AbstractComponent implements OnInit {

  @ViewChild('inputWrapper') inputWrapper: ElementRef | undefined
  @ViewChild('inputElement') inputElement: ElementRef | undefined
  iconType = IconType
  iconPositionType = IconPositionType

  ngOnInit(): void {
    this.props = TextInput.getProperties()
    this.props.forEach((v,k)=>{
      this.storeService.bindToStateProperty(this.name,k)?.subscribe(res=>{
        this.setPropValue(k,res)
      })
    })
    this.storeService.bindToStateProperty(this.name,PropertyName.reset)?.subscribe(res=>{
      if(res) this.reset()
    })
  }
  reset(){
    this.setPropValue(PropertyName.outputData,null)
  }
  getValue():string{
    const data = this.getPropValue(PropertyName.outputData)
    if(data && !(this.getPropValue(PropertyName.dataLink) instanceof Array)) return data
    if(data && this.getPropValue(PropertyName.dataLink) instanceof Array){
      const dataLink = [...this.getPropValue(PropertyName.dataLink)]
      dataLink.shift()
      let head:string
      let tail:Object = data
      while(dataLink.length>0){
        head = dataLink.shift()
        const e = Object.entries(tail).find(ent=>{
          return ent[0]===head
        })
        if(e){
          if(typeof e[1]==='string' && dataLink.length===0){
            return e[1]
          } else if(typeof e[1]==='object'){
            tail = e[1]
          }
        }
      }
    }
    return ''
  }
  setCalculatedHeight(val:any):boolean{
    if(typeof val === 'string'){
      this.inputWrapper?.nativeElement.style?.setProperty('--heightVal','calc('+val+')')
      this.setPropValue(PropertyName.height,undefined)
      return true
    }
    this.setPropValue(PropertyName.height,'100%')
    return false
  }
  setCalculatedWidth(val:any):boolean{
    if(typeof val === 'string'){
      this.inputWrapper?.nativeElement.style?.setProperty('--widthVal','calc('+val+')')
      this.setPropValue(PropertyName.width,undefined)
      return true
    }
    this.setPropValue(PropertyName.width,'100%')
    return false
  }
  updateData() {
    this.clientDataService.updateClientData(this.name, this.inputElement?.nativeElement.value)
  }
}
