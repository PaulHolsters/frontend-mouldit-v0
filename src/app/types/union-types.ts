import {ResponsiveAttributesConfigModel} from "../models/Attributes/ResponsiveAttributesConfigModel";
import {ResponsiveDimensioningConfigModel} from "../models/Dimensioning/self/ResponsiveDimensioningConfigModel";
import {ResponsiveOverflowConfigModel} from "../models/Overflow/self/ResponsiveOverflowConfigModel";
import {ResponsiveStylingConfigModel} from "../models/Styling/ResponsiveStylingConfigModel";
import {ResponsivePositioningConfigModel} from "../models/Positioning/self/ResponsivePositioningConfigModel";
import {ResponsiveChildLayoutConfigModel} from "../models/ChildLayout/ResponsiveChildLayoutConfigModel";
import {ResponsiveVisibilityConfigModel} from "../models/Visibility/ResponsiveVisibilityConfigModel";
import {DataRecordModel} from "../models/DataRecordModel";
import {EnumValueType, ObjectIdType} from "./type-aliases";

export type ResponsiveConfigModel = ResponsiveAttributesConfigModel|ResponsiveDimensioningConfigModel
  |ResponsiveOverflowConfigModel|ResponsiveStylingConfigModel|
  ResponsivePositioningConfigModel|ResponsiveChildLayoutConfigModel|ResponsiveVisibilityConfigModel
// todo secuur bijhouden!
export type RenderPropertyValueType = string|DataRecordModel|DataRecordModel[]|Date|boolean|number
export type ConceptPropertyValueType = string|boolean|EnumValueType|number|ObjectIdType|ObjectIdType[]

/*
* (
*   id:"648ae00b9b404a9b8fa2a3c1",
*   name:"wearegoud558885",
    category:TINY_HOUSE,
    price:74854,
    specifications:[ "62cddf8c4802ad186c0a24f8",
*                       "62cddfbd4802ad186c0a250d",
*                       "62cddf834802ad186c0a24f5",
*                       "62cddfb24802ad186c0a2507",
*                       "62cddfd24802ad186c0a2513",
*                       "62cddfc94802ad186c0a2510"
*                     ]
*   )
* */