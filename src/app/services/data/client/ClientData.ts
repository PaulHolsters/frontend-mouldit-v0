import {ActionIdType, ComponentNameType} from "../../../types/type-aliases";
import {Blueprint} from "./Blueprint";
import {NoValueType} from "../../../enums/no_value_type";
import {DataRecordModel} from "../../../design-dimensions/DataRecordModel";

export class ClientData {
  public constructor(public readonly id:ActionIdType,public readonly name:ComponentNameType, private _blueprint:Blueprint,
                     public data:(DataRecordModel|null)[]|DataRecordModel|NoValueType.NVY=NoValueType.NVY,
                     public hardcodedData:any|NoValueType.NA=NoValueType.NA,
                     public attributes:AttributeComponentModel[]|NoValueType.NA=NoValueType.NA,
                     public errorMessages:string[]|NoValueType.NI=NoValueType.NI) {
  }
  public get blueprint():Blueprint{
    return Object.create(this._blueprint)
  }
  public update(data:Blueprint|DataRecordModel|(DataRecordModel|null)[]){
    if(data instanceof Array){
      this.data = data
    }  else if(data instanceof Blueprint){
      this._blueprint = data
    } else if(data.hasOwnProperty('id') && data.hasOwnProperty('__typename')){
      this.data = data
    } else throw new Error('Data has an invalid format: '+data.toString())
  }

}
