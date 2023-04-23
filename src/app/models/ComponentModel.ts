import {ResponsiveAttributesConfigModel} from "./Attributes/ResponsiveAttributesConfigModel";
import {ResponsivePositioningConfigModel} from "./Positioning/self/ResponsivePositioningConfigModel";
import {ResponsiveVisibilityConfigModel} from "./Visibility/ResponsiveVisibilityConfigModel";
import {ResponsiveDimensioningConfigModel} from "./Dimensioning/self/ResponsiveDimensioningConfigModel";
import {ComponentType} from "../enums/componentTypes.enum";
import {ResponsiveOverflowConfigModel} from "./Overflow/self/ResponsiveOverflowConfigModel";
import {ResponsiveStylingConfigModel} from "./Styling/ResponsiveStylingConfigModel";
import {ResponsiveChildLayoutConfigModel} from "./ChildLayout/ResponsiveChildLayoutConfigModel";
export class ComponentModel {
  isComponent?:boolean = true
  constructor(  public name:string,
                public type:ComponentType,
                public childLayout?:ResponsiveChildLayoutConfigModel,
                public position?:ResponsivePositioningConfigModel,
                public dimensions?:ResponsiveDimensioningConfigModel,
                public attributes?:ResponsiveAttributesConfigModel,
                public visibility?:ResponsiveVisibilityConfigModel,
                public overflow?:ResponsiveOverflowConfigModel,
                public children?:(ComponentModel|string)[],
                public styling?:ResponsiveStylingConfigModel) {
    // todo toevoegen constraints
  }
}
