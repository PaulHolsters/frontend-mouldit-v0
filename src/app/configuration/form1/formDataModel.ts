import {ConceptConfigModel} from "../../models/Data/ConceptConfigModel";
import {AttributeConfigModel} from "../../models/Data/AttributeConfigModel";
import {TextAttributeConfigModel} from "../../models/Data/TextAttributeConfigModel";
import {RestrictionType} from "../../enums/restrictionType.enum";
import {IconType} from "../../enums/iconType.enum";
import {IconPositionType} from "../../enums/iconPositionType.enum";
import {InputFontSizeType} from "../../enums/inputFontSizeType.enum";
import {NoValueType} from "../../enums/no_value_type";
import {NumberAttributeConfigModel} from "../../models/Data/NumberAttributeConfigModel";
import {NumberInputModeType} from "../../enums/numberInputModeType.enum";
import {LocaleType} from "../../enums/localeType.enum";
import {CurrencyType} from "../../enums/currencyType.enum";
import {CurrencyDisplayType} from "../../enums/currencyDisplayType.enum";
import {ButtonClassType} from "../../enums/buttonClassType.enum";
import {ButtonLayoutType} from "../../enums/buttonLayoutType.enum";
import {RadioAttributeConfigModel} from "../../models/Data/RadioAttributeConfigModel";
import {MultiSelectAttributeConfigModel} from "../../models/Data/MultiSelectAttributeConfigModel";

export const formData = new ConceptConfigModel(
  'product',
  [
    new AttributeConfigModel(
      'name',
      undefined,
      false,
      false,
      new TextAttributeConfigModel(RestrictionType.Alphanumeric, RestrictionType.NA, IconType.Check, IconPositionType.Left,
        InputFontSizeType.Large, NoValueType.NVY),
      undefined, undefined,undefined,undefined, 'Product naam', 'Geef een adequate naam'
    ),
    new AttributeConfigModel(
      'cat',
      undefined,
      false,
      false,
      undefined,
      undefined,
      new RadioAttributeConfigModel(
        NoValueType.DBI,
        NoValueType.DBI,
        NoValueType.NVY
      ),undefined,undefined,'Categorie','Selecteer één van de mogelijke categorieën',undefined
    )
    ,
    new AttributeConfigModel(
      'price',
      undefined,
      false,
      false,
      undefined,
      new NumberAttributeConfigModel(
        true,
        true,
        1,
        NumberInputModeType.Currency, LocaleType.nl_NL, CurrencyType.EUR, CurrencyDisplayType.CODE, undefined, undefined,
        undefined, undefined, ButtonClassType.Success,
        ButtonClassType.Primary, IconType.Plus, IconType.Min, undefined, undefined, ButtonLayoutType.Stacked, NoValueType.NVY),
      undefined,undefined,undefined,
      'Basisprijs',
      'Geef een getal in tussen -445 en 10'),
    new AttributeConfigModel(
      'specifications',
      undefined,
      false,
      NoValueType.NA,
      undefined,
      undefined,
      undefined,
      new MultiSelectAttributeConfigModel(NoValueType.DBI, NoValueType.DBI,NoValueType.DBI,NoValueType.DBI),
      new ConceptConfigModel('specification',[
        new AttributeConfigModel(
          'name',
          undefined,
          false,
          false,
          new TextAttributeConfigModel(RestrictionType.Alphanumeric, RestrictionType.NA, IconType.Check, IconPositionType.Left,
            InputFontSizeType.Large, NoValueType.NVY),
          undefined, undefined,undefined,undefined, 'Specificatie', 'Geef een adequate naam'
        )
      ]),
      'Product specificaties',
      'Selecteer alle eigenschappen van toepassing op het product'
    )
  ])