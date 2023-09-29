import {ComponentI} from "../../Interfaces/ComponentI";
import {ResponsiveVisibilityConfigModel} from "../../design-dimensions/Visibility/ResponsiveVisibilityConfigModel";
import {ComponentModel} from "../../design-dimensions/ComponentModel";
import {ResponsiveSizeConfigModel} from "../../design-dimensions/Size/ResponsiveSizeConfigModel";
import {ResponsiveOverflowConfigModel} from "../../design-dimensions/Overflow/ResponsiveOverflowConfigModel";
import {ResponsiveSpacingConfigModel} from "../../design-dimensions/Spacing/ResponsiveSpacingConfigModel";
import {ClientDataConfigModel} from "../../design-dimensions/ClientData/ClientDataConfigModel";
import {ZeroValueType} from "../../enums/zeroValueTypes.enum";
import {
  TableDataRepresentationConfigModel
} from "../../design-dimensions/DataRepresentation/Table/TableDataRepresentationConfigModel";
import {
  TableContentInjectionConfigModel
} from "../../design-dimensions/ContentInjection/table/TableContentInjectionConfigModel";
import {TableStructuralConfigModel} from "../../design-dimensions/StructuralConfig/table/TableStructuralConfigModel";
import {
  ResponsiveStructuralTableConfigModel
} from "../../design-dimensions/StructuralConfig/table/ResponsiveStructuralTableConfigModel";
import {
  ResponsiveDataRepresentationTableConfigModel
} from "../../design-dimensions/DataRepresentation/Table/ResponsiveDataRepresentationTableConfigModel";
import {
  ResponsiveContentInjectionTableConfigModel
} from "../../design-dimensions/ContentInjection/table/ResponsiveContentInjectionTableConfigModel";
import {
  ResponsiveStylingTableConfigModel
} from "../../design-dimensions/Styling/table/ResponsiveStylingTableConfigModel";
import {TableStylingConfigModel} from "../../design-dimensions/Styling/table/TableStylingConfigModel";
import {
  ResponsiveIndividualLayoutConfigModel
} from "../../design-dimensions/IndividualLayout/ResponsiveIndividualLayoutConfigModel";
import {
  ResponsiveContentInjectionConfigModel
} from "../../design-dimensions/ContentInjection/ResponsiveContentInjectionConfigModel";
import {
  TableContentInjectionRenderModel
} from "../../design-dimensions/ContentInjection/table/TableContentInjectionRenderModel";
import {ContentInjectionRenderType} from "../../types/conditional-types";
export class Table extends ComponentModel implements ComponentI{
  // todo add conditional typing : prop required => set required too
  name:string
  spacing:ResponsiveSpacingConfigModel = new ResponsiveSpacingConfigModel()
  setSpacing(spacing:ResponsiveSpacingConfigModel){
    this.spacing = spacing
    return this
  }
  visibility: ResponsiveVisibilityConfigModel = new ResponsiveVisibilityConfigModel()
  setVisibility(visibility:ResponsiveVisibilityConfigModel){
    this.visibility = visibility
    return this
  }
  size: ResponsiveSizeConfigModel= new ResponsiveSizeConfigModel()
  setSize(size:ResponsiveSizeConfigModel){
    this.size = size
    return this
  }
  overflow: ResponsiveOverflowConfigModel = new ResponsiveOverflowConfigModel()
  setOverflow(overflow:ResponsiveOverflowConfigModel){
    this.overflow = overflow
    return this
  }
  individualLayout: ResponsiveIndividualLayoutConfigModel = new ResponsiveIndividualLayoutConfigModel()
  setLayoutOverride(il:ResponsiveIndividualLayoutConfigModel){
    this.individualLayout=il
    return this
  }
  clientData: ClientDataConfigModel|ZeroValueType.NoValueYet=ZeroValueType.NoValueYet
  setClientData(cd:ClientDataConfigModel|ZeroValueType.NoValueYet){
    this.clientData=cd
    return this
  }
  dataRepresentation: ResponsiveDataRepresentationTableConfigModel=new ResponsiveDataRepresentationTableConfigModel(
      new TableDataRepresentationConfigModel()
  )
  setDataRepresentation(dr:ResponsiveDataRepresentationTableConfigModel){
    this.dataRepresentation=dr
    return this
  }
  contentInjection=new ResponsiveContentInjectionConfigModel<TableContentInjectionConfigModel,ContentInjectionRenderType<TableContentInjectionConfigModel>>(
    new TableContentInjectionConfigModel()
  )
  setContentInjection(ci:ResponsiveContentInjectionTableConfigModel){
    this.contentInjection=ci
    return this
  }
  componentSpecificConfig: ResponsiveStructuralTableConfigModel=new ResponsiveStructuralTableConfigModel(
    new TableStructuralConfigModel()
  )
  setComponentSpecificConfig(cs:ResponsiveStructuralTableConfigModel){
    this.componentSpecificConfig=cs
    return this
  }
  styling: ResponsiveStylingTableConfigModel=new ResponsiveStylingTableConfigModel(
    new TableStylingConfigModel())
  setStyling(st:ResponsiveStylingTableConfigModel){
    this.styling=st
    return this
  }

  dataInput = undefined
  setDataInput = undefined

  children=undefined
  setChildren=undefined
  layout=undefined
  setLayout=undefined
  constructor(name:string) {
    super()
    this.name = name
  }
}