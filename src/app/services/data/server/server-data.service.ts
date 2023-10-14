import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ActionsService} from "../../actions.service";
import {ConfigService} from "../../config.service";
import {ActionType} from "../../../enums/actionTypes.enum";
import {Action} from "../../../effectclasses/Action";
import {TriggerType} from "../../../enums/triggerTypes.enum";
import {Apollo} from "apollo-angular";
import {QueryService} from "./queries/query.service";
import {MutationService} from "./mutations/mutation.service";
import {ActionIdType, ComponentNameType, ConceptNameType, DataLink,} from "../../../types/type-aliases";
import {Effect} from "../../../effectclasses/Effect";
import {Blueprint} from "../client/Blueprint";
import {ClientDataService} from "../client/client-data.service";
import {ServerData} from "./ServerData";
import {OutputData} from "../../../types/union-types";
import {ClientData} from "../client/ClientData";

// todo fix
@Injectable({
  providedIn: 'root'
})
export class ServerDataService {
  //  todo een taal bedenken voor extra calculated fields based on related data and concepts
  //  todo a way to filter data
  //  todo a way to order data (sort)
  public actionFinished = new Subject<{trigger:TriggerType.ActionFinished,source:ActionIdType}>()

  constructor(private configService:ConfigService,
              private apollo: Apollo,
              private actionsService:ActionsService,
              private clientDataService:ClientDataService,
              private queryService:QueryService,
              private mutationService:MutationService
  ) {
    this.actionsService.bindToActionsEmitter.subscribe(res=>{
      this.bindActions()
    })
  }
  private extractConcept(concept:ConceptNameType|undefined|DataLink):ConceptNameType|undefined{
    if(!concept) return concept
    if(!(concept instanceof Array)) return concept
    if(concept.length===0) return undefined
    return concept[0]
  }
  public bindActions(){

    //********************     queries     ****************************/

    this.actionsService.bindToAction(new Action('',ActionType.GetBluePrint))?.subscribe(async res => {
      if (res?.effect.action.conceptName && res.effect.action.target) {
        const concept = this.extractConcept(res.effect.action.conceptName)
        const target = res.effect.action.target
        if(concept){
          this.queryService.getNumberOfNesting(concept).subscribe(resFirst=>{
            const data = ServerData.getData(resFirst)
            if(data){
              if(ServerData.dataIsNumber(data,'numberOfNesting')){
                this.queryService
                  .getBlueprint(concept,ServerData.getDataValue(data,'numberOfNesting'))
                  .subscribe(resOrErr=>{
                    const data = ServerData.getData(resOrErr)
                    if(data){
                      // todo op termijn type safety toevoegen voor data zodat dit het gewenste type is =>
                      //      dit is wellicht een mooie kandidaat voor branded types
                      //      de reden waarom dat niet gecontroleerd wordt is dat data van het any type is
                      //      dat is niet conform de type van de parameter maar het wordt gewoon niet gecontroleerd
                      createClientData(this,data.blueprint,res.effect.action.id,target,[], data)
                      this.actionFinished.next({trigger: TriggerType.ActionFinished, source: res.effect.action.id})
                    } else{
                      // todo handle error
                    }
                  })
              }
            }
          })
        }
      }
    })

    this.actionsService.bindToAction(new Action('',ActionType.GetInstance))?.subscribe(async res => {
      if (res) {
        const concept = this.extractConcept(res.effect.action.conceptName)
        const info:{effect:Effect,data:string,target:EventTarget} = res as {effect:Effect,data:string,target:EventTarget}
        if (typeof res.data === 'string' && res.effect.action.target && concept) {
          // todo zie dat je hier van een ObjectId type kan uitgaan = branded type!
          function getRecord(self:ServerDataService, blueprint:Blueprint, res:
            {effect: Effect, data: string, target: EventTarget | undefined},concept:ConceptNameType){
              self.queryService.getSingleRecord(concept, blueprint, res.data).subscribe(errorOrResult=>{
                const data = ServerData.getData(errorOrResult)
                if(data.dataSingle){
                  if(data.dataSingle){
                    // todo opgepast data is of type any
                    self.clientDataService.updateClientData(res.effect.action.id,data.dataSingle)
                    const cd = self.clientDataService.getClientData(res.effect.action.target)
                    if(cd) self.clientDataService.clientDataUpdated.next(cd)
                  }
                  self.actionFinished.next({trigger: TriggerType.ActionFinished, source: res.effect.action.id})
                } else{
                  throw new Error('bad types')
                }
              })
            }
          const blueprint = this.clientDataService.getClientData(res.effect.action.target)?.blueprint
          if (blueprint) {
            getRecord(this,blueprint,info,concept)
          } else{
            this.queryService.getNumberOfNesting(concept).subscribe(resFirst=>{
              const data = ServerData.getData(resFirst)
              if(data){
              if(ServerData.dataIsNumber(data,'numberOfNesting')){
                this.queryService.getBlueprint(concept,data.numberOfNesting).subscribe(resOrErr=>{
                  const data = ServerData.getData(resOrErr)
                  if(data){
                    // todo opgepast data is of type any!!!
                    createClientData(this,data.blueprint,res.effect.action.id,res.effect.action.target,[],data)
                    const blueprint = this.clientDataService.getClientData(res.effect.action.target)?.blueprint
                    if (blueprint) {
                      getRecord(this,blueprint,info,concept)
                    }
                  } else{
                    // todo handle error
                  }
                })
              }} else{
                // todo handle error
              }
            })
          }
        }
      }
    })

    this.actionsService.bindToAction(new Action('',ActionType.GetAllInstances))?.subscribe(async res => {
      if (res && res.data instanceof ClientData && res.data.outputData) {
        const info = {effect:res.effect,data:res.data.outputData,target:res.target}
        const concept = this.extractConcept(res.effect.action.conceptName)
        function getAllRecords(self:ServerDataService, blueprint:Blueprint, res:{effect: Effect,
          data: OutputData, target: EventTarget | undefined},concept:ConceptNameType){
          self.queryService.getAllRecords(concept, blueprint).subscribe(errorOrResult=>{
            const data = ServerData.getData(errorOrResult)
            if(data.dataMultiple){
              self.clientDataService.updateClientData(res.effect.action.id,data.dataMultiple)
              const cd = self.clientDataService.getClientData(res.effect.action.target)
              if(cd){
                self.clientDataService.clientDataUpdated.next(cd)
              }
            } else{
              // todo handle error
            }
            self.actionFinished.next({trigger: TriggerType.ActionFinished, source: res.effect.action.id})
          })
        }
        const blueprint = this.clientDataService.getClientData(res.effect.action.target)?.blueprint
        if (blueprint && concept) {
          getAllRecords(this,blueprint,info,concept)
        } else if(concept){
          this.queryService.getNumberOfNesting(concept).subscribe(resFirst=>{
            const data = ServerData.getData(resFirst)
            if(ServerData.dataIsNumber(data,'numberOfNesting')){
              const numberOfNesting = ServerData.getDataValue(data,'numberOfNesting')
              this.queryService.getBlueprint(concept, numberOfNesting).subscribe(resOrErr => {
                const data = ServerData.getData(resOrErr)
                if(data){
                  createClientData(this, data.blueprint, res.effect.action.id,res.effect.action.target,[], undefined)
                  const blueprint = this.clientDataService.getClientData(res.effect.action.target)?.blueprint
                  if (blueprint) {
                    getAllRecords(this, blueprint, info,concept)
                  }
                } else{
                  // todo handle error
                }
              })
            }
          })
        }
      }
    })

    //********************     mutations     ****************************/

    this.actionsService.bindToAction(new Action('',ActionType.DeleteInstance))?.subscribe(res => {
      // todo werk data als any weg
      if (res &&  res.data instanceof ClientData) {
        // todo verder uitwerken bv cverwijderen vabn client data

        this.mutationService.deleteRecordOrHandleError(res.data)?.subscribe(errorOrResult=>{
          if (errorOrResult) {
            this.actionFinished.next({trigger: TriggerType.ActionFinished, source: res.effect.action.id})
          }
        })
      }
    })
    this.actionsService.bindToAction(new Action('',ActionType.CreateInstance))?.subscribe(res=>{
      if(res){
        const clientData = this.clientDataService.getClientData(res.effect.action.target)
        if(!clientData) throw new Error('No valid clientData found')
        this.mutationService.createRecordOrHandleError(clientData).subscribe(errorOrResult=>{
          if (errorOrResult) {
            // todo wijzigen clientdata na aanmaak van nieuwe instance in db
            this.actionFinished.next({trigger: TriggerType.ActionFinished, source: res.effect.action.id})
          }
        })
      }
    })
    this.actionsService.bindToAction(new Action('',ActionType.UpdateInstance))?.subscribe(res=>{
      if(res){
        const clientData = this.clientDataService.getClientData(res.effect.action.target)
        if(!clientData) throw new Error('No valid clientData found')
        this.mutationService.updateRecordOrHandleError(clientData).subscribe(errorOrResult=>{
          if (errorOrResult) {
            // todo wijzigen clientdata na wijizgen van instance in db
            this.actionFinished.next({trigger: TriggerType.ActionFinished, source: res.effect.action.id})
          }
        })
      }
    })
    //********************     Helpers     ****************************/
    function createClientData(self:ServerDataService,
                              blueprintStr:string|undefined,
                              actionId:ActionIdType,
                              name:ComponentNameType,
                              errorMessages:string[]|undefined,
                              data:OutputData|undefined){
      if(blueprintStr){
        self.clientDataService.createClientData(
          actionId,
          name,
          new Blueprint(blueprintStr),
          data,
          errorMessages
        )
        const cd = self.clientDataService.getClientData(name)
        if(cd){
          self.clientDataService.clientDataUpdated.next(cd)
        }
      }
    }
  }
}
