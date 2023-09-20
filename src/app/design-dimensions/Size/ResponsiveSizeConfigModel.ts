import {SizeConfigModel} from "./SizeConfigModel";
import {ScreenSize} from "../../enums/screenSizes.enum";
import {SizeRenderModel} from "./SizeRenderModel";
import {ResponsiveConfigModel} from "../ResponsiveConfigModel";
import {ZeroValueType} from "../../enums/zeroValueTypes.enum";
import {CalculatedSizeConfigModel} from "./CalculatedSizeConfigModel";
import {NonCalculatedSizeConfigModel} from "./NonCalculatedSizeConfigModel";
import {ParentConfigType} from "../../enums/ParentConfigTypes.enum";
import {ButtonSizeConfigModel} from "./button/ButtonSizeConfigModel";
import {ButtonSizeRenderModel} from "./button/ButtonSizeRenderModel";
export class ResponsiveSizeConfigModel extends ResponsiveConfigModel<ResponsiveSizeConfigModel>{
  public highResolution: SizeConfigModel| ZeroValueType.DeterminedByEngine =ZeroValueType.DeterminedByEngine
  public laptop: SizeConfigModel | ZeroValueType.DeterminedByEngine =ZeroValueType.DeterminedByEngine
  public portraitTablet: SizeConfigModel| ZeroValueType.DeterminedByEngine =ZeroValueType.DeterminedByEngine
  public tablet: SizeConfigModel| ZeroValueType.DeterminedByEngine =ZeroValueType.DeterminedByEngine
  public smartphone:SizeConfigModel = new SizeConfigModel()
  setDimensions(screensize:ScreenSize,model:SizeConfigModel){
    // todo
  }
  constructor(){
    super()
  }
  public getDimensionsRenderProperties(screenSize: number): SizeRenderModel {
    // todo add size based on components mapping
    const mapToDimensioningRenderProperties = (dimensionsConfig: SizeConfigModel): SizeRenderModel => {
      const compPropsObj = new SizeRenderModel()
      if(dimensionsConfig.width){
        if(dimensionsConfig.width instanceof CalculatedSizeConfigModel){
          compPropsObj.width = dimensionsConfig.width.value
        } else if(dimensionsConfig.width instanceof NonCalculatedSizeConfigModel){
          compPropsObj.width = dimensionsConfig.width.value+dimensionsConfig.width.unit
        } else if(dimensionsConfig.width === ParentConfigType.static){
          compPropsObj.width = ParentConfigType.static
          compPropsObj.calcWidth = ParentConfigType.static
        } else throw new Error('Er is een optie bijgekomen die nog niet werd geïmplementeerd')
      }
      if(dimensionsConfig.height){
        if(dimensionsConfig.height instanceof CalculatedSizeConfigModel){
          compPropsObj.height = dimensionsConfig.height.value
        } else if(dimensionsConfig.height instanceof NonCalculatedSizeConfigModel){
          compPropsObj.height = dimensionsConfig.height.value+dimensionsConfig.height.unit
        } else if(dimensionsConfig.height === ParentConfigType.static){
          compPropsObj.height = ParentConfigType.static
          compPropsObj.calcHeight = ParentConfigType.static
        } else throw new Error('Er is een optie bijgekomen die nog niet werd geïmplementeerd')
      }
      if(dimensionsConfig.dynamic){
        compPropsObj.grow = dimensionsConfig.dynamic.grow
        compPropsObj.shrink = dimensionsConfig.dynamic.shrink
      }
      if(dimensionsConfig.componentSpecificSize){
        // todo zorg ervoor via conditional typing dat je hier altijd de juiste moet gebruiken (naming!)
        if(dimensionsConfig.componentSpecificSize instanceof ButtonSizeConfigModel){
          const rm = new ButtonSizeRenderModel()
          rm.size = dimensionsConfig.componentSpecificSize.size
          compPropsObj.componentSpecificSize = rm
        }
      }
      return compPropsObj
    }
    return this.getRenderProperties(screenSize,mapToDimensioningRenderProperties)
  }
  getInstance(){
    return 'dimensions'
  }
}
