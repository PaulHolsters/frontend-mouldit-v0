import {ButtonMeaningType} from "../../../enums/buttonMeaningType.enum";
import {ButtonAppearanceType} from "../../../enums/buttonAppearanceType.enum";

export class ButtonStylingRenderModel {
  public meaning:ButtonMeaningType|undefined=undefined
  public appearance:ButtonAppearanceType|undefined=undefined
  public raised:boolean|undefined=undefined
  public rounded:boolean|undefined=undefined
  constructor() {
  }
  public setProperty(propName: string, value: any|undefined): void {
    if (Reflect.has(this, propName))
      Reflect.set(this, propName, value)
    else throw new Error('cannot set property ' + propName + ' because it does not exist on the object of type PositioningComponentPropsModel')
  }

}