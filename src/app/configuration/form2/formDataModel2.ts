import {ConceptConfigModel} from "../../models/Data/ConceptConfigModel";
import {AttributeConfigModel} from "../../models/Data/AttributeConfigModel";
import {TextAttributeConfigModel} from "../../models/Data/TextAttributeConfigModel";
import {RestrictionType} from "../../enums/restrictionType.enum";
import {IconType} from "../../enums/iconType.enum";
import {IconPositionType} from "../../enums/iconPositionType.enum";
import {InputFontSizeType} from "../../enums/inputFontSizeType.enum";
import {NoValueType} from "../../enums/no_value_type";
// todo probeer straks ook is met "concept" eigenschap in conceptName 'product'
//      pas dan heb je een echt genest concept
export const formData2 = new ConceptConfigModel(
  'specification',
  [
    new AttributeConfigModel(
      'name',
      undefined,
      false,
      false,
      new TextAttributeConfigModel(RestrictionType.Alphanumeric, RestrictionType.NA,IconType.NI, IconPositionType.NA, InputFontSizeType.Base, NoValueType.NVY),
      undefined,
      undefined,
      undefined,
      undefined,
      'Product eigenschappen'
    )
  ])