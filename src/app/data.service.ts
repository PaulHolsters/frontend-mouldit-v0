import { Injectable } from '@angular/core';
import {StoreService} from "./store.service";
import {ConceptModel} from "./models/Data/ConceptModel";
import {ComponentModel} from "./models/ComponentModel";
import {ConceptConfigModel} from "./models/Data/ConceptConfigModel";
import {QueryType} from "./enums/queryType.enum";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private setDataState(data:ConceptModel,compName:string,compDataConfig:ConceptConfigModel){
    // deze methode verzendt de data naar de componenten voor dewelke de
    // data is gewijzigd
    // todo hou rekening met de dataPipe

  }
  constructor(private storeService:StoreService) { }
  private fakeQuery(data:ConceptConfigModel):ConceptModel {
    // todo make this query correct and test it all out
    return new ConceptModel('product', [])
  }
  private fakeMutation(data:ConceptModel){

  }
  public mutationEvent(data:ConceptModel){
    this.fakeMutation(data)
  }
  public componentReady(name:string){
    let componentConfig = this.storeService.getComponent(name)
    if(!componentConfig){
      componentConfig = this.storeService.getComponentThroughAttributes(name)
    }
    if(componentConfig && componentConfig.data){
      this.setDataState(this.fakeQuery(componentConfig.data),name,componentConfig.data)
    }
  }
}
