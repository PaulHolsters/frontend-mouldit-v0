import {ComponentType} from "../../enums/componentTypes.enum";
import {ResponsiveDimensioningConfigModel} from "../../models/Dimensioning/self/ResponsiveDimensioningConfigModel";
import {DimensioningConfigPropsModel} from "../../models/Dimensioning/self/DimensioningConfigPropsModel";
import {ResponsiveVisibilityConfigModel} from "../../models/Visibility/ResponsiveVisibilityConfigModel";
import {VisibilityConfigPropsModel} from "../../models/Visibility/VisibilityConfigPropsModel";
import {conceptModel} from "../root/appDataModel";
import {ResponsiveAttributesConfigModel} from "../../models/Attributes/ResponsiveAttributesConfigModel";
import {HeightValueConfigType} from "../../enums/HeightValueConfigTypes.enum";
import {WidthConfigPropsModel} from "../../models/Dimensioning/self/WidthConfigPropsModel";
import {FixedDimensioningConfigModel} from "../../models/Dimensioning/self/FixedDimensioningConfigModel";
import {DimensionValueConfigType} from "../../enums/dimensionValueConfigTypes.enum";
import {DimensionUnitConfigType} from "../../enums/dimensionUnitConfigTypes.enum";
import {DynamicDimensionValueConfigType} from "../../enums/DynamicDimensionValueConfigTypes.enum";
import {ResponsiveStylingConfigModel} from "../../models/Styling/ResponsiveStylingConfigModel";
import {TableStylingType} from "../../enums/tableStylingType.enum";
import {NoValueType} from "../../enums/no_value_type";
import {StylingConfigPropsModel} from "../../models/Styling/StylingConfigPropsModel";
import {ResponsiveTableLayoutType} from "../../enums/responsiveTableLayoutType.enum";
import {AttributesConfigPropsModel} from "../../models/Attributes/AttributesConfigPropsModel";

export const table = {
  name: 'table',
  type: ComponentType.Table,
  visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
  styling: new ResponsiveStylingConfigModel(new StylingConfigPropsModel(
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    NoValueType.NA,
    TableStylingType.Gridlines,
    ResponsiveTableLayoutType.Stacked,
    400)),
  dimensions: new ResponsiveDimensioningConfigModel(new DimensioningConfigPropsModel(HeightValueConfigType.NC, new WidthConfigPropsModel(
    new FixedDimensioningConfigModel(DimensionValueConfigType.Hardcoded, 100, DimensionUnitConfigType.Percentage), DynamicDimensionValueConfigType.NC
  ))),
  attributes: new ResponsiveAttributesConfigModel(
    new AttributesConfigPropsModel(NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA,
      'Geen producten aanwezig.',
      true,
      10,
      [5, 10, 20],
      NoValueType.NA,
      NoValueType.NA,
      false,
      false,
      false,
      NoValueType.NA,
      NoValueType.NA,
      NoValueType.NA
    )),
  //overflow: new ResponsiveOverflowConfigModel(new OverflowConfigPropsModel(OverflowValueConfigType.NA, OverflowValueConfigType.Auto)),
  // todo deep copy methode toevoegen wegens reference issues die voorlopig geen gevolgen hebben maar goed
  data: conceptModel
}
/*
*       // todo zoekmethodes vinden columnHeaderComponents maar niet extraColumns ... => da's logisch dit is een property in een NIET componentmodel
      [
        new TableColumnModel('actions', '', false, false, false,
          new ComponentModel(
            'edit-product-btn', ComponentType.Button, undefined, undefined, undefined,
            new ResponsiveAttributesConfigModel(
              new AttributesConfigPropsModel(NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, 'edit')),
            new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel())
          )
        )
      ]
*
* ,
      [
        {
          name: 'c1-header',
          type: ComponentType.Container,
          visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
          position: new ResponsivePositioningConfigModel(new PositioningConfigPropsModel(DisplayType.Inline)),
          children: [
            {
              name: 'sort-h1',
              type: ComponentType.Icon,
              attributes: new ResponsiveAttributesConfigModel(new AttributesConfigPropsModel(
                NoValueType.NA, NoValueType.NA, NoValueType.NA, IconType.Sort
              )),
              visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
              styling: new ResponsiveStylingConfigModel(new StylingConfigPropsModel(
                  undefined, undefined, undefined, NoValueType.NA, NoValueType.NA, NoValueType.NA,
                  NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, undefined,
                  ButtonSizeType.Small, undefined, ButtonAppearanceType.InnerOnly, undefined,
                  IconSizeType.Normal, IconMeaningType.Danger
                )
              ),
              position: new ResponsivePositioningConfigModel(new PositioningConfigPropsModel(DisplayType.Inline))
            },
            {
              name: 'filter-h1',
              type: ComponentType.Icon,
              attributes: new ResponsiveAttributesConfigModel(new AttributesConfigPropsModel(
                NoValueType.NA, NoValueType.NA, NoValueType.NA, IconType.Filter
              )),
              visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
              styling: new ResponsiveStylingConfigModel(new StylingConfigPropsModel(
                  undefined, undefined, undefined, NoValueType.NA, NoValueType.NA, NoValueType.NA,
                  NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, undefined,
                  ButtonSizeType.Small, undefined, ButtonAppearanceType.InnerOnly, undefined,
                  IconSizeType.Normal, IconMeaningType.Danger
                )
              ),
              position: new ResponsivePositioningConfigModel(new PositioningConfigPropsModel(DisplayType.Inline))
            }
          ]
        },
        {
          name: 'sort-h2',
          type: ComponentType.Icon,
          attributes: new ResponsiveAttributesConfigModel(new AttributesConfigPropsModel(
            NoValueType.NA, NoValueType.NA, NoValueType.NA, IconType.Sort
          )),
          visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
          styling: new ResponsiveStylingConfigModel(new StylingConfigPropsModel(
            undefined, undefined, undefined, NoValueType.NA, NoValueType.NA, NoValueType.NA,
            NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, undefined,
            ButtonSizeType.Small, undefined, ButtonAppearanceType.InnerOnly, undefined,
            IconSizeType.Large, IconMeaningType.Danger
          )),
          position: new ResponsivePositioningConfigModel(new PositioningConfigPropsModel(DisplayType.Inline))
        },
        {
          name: 'sort-h3',
          type: ComponentType.Icon,
          attributes: new ResponsiveAttributesConfigModel(new AttributesConfigPropsModel(
            NoValueType.NA, NoValueType.NA, NoValueType.NA, IconType.Sort
          )),
          visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
          styling: new ResponsiveStylingConfigModel(new StylingConfigPropsModel(
            undefined, undefined, undefined, NoValueType.NA, NoValueType.NA, NoValueType.NA,
            NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, undefined,
            ButtonSizeType.Small, undefined, ButtonAppearanceType.InnerOnly, undefined,
            IconSizeType.Small, IconMeaningType.Danger
          )),
          position: new ResponsivePositioningConfigModel(new PositioningConfigPropsModel(DisplayType.Inline))
        },
        {
          name: 'sort-h4',
          type: ComponentType.Icon,
          attributes: new ResponsiveAttributesConfigModel(new AttributesConfigPropsModel(
            undefined, undefined, undefined, NoValueType.NA, IconType.Sort
          )),
          visibility: new ResponsiveVisibilityConfigModel(new VisibilityConfigPropsModel()),
          styling: new ResponsiveStylingConfigModel(new StylingConfigPropsModel(
            undefined, undefined, undefined, NoValueType.NA, NoValueType.NA, NoValueType.NA,
            NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, NoValueType.NA, undefined,
            ButtonSizeType.Small, undefined, ButtonAppearanceType.InnerOnly, undefined,
            IconSizeType.Large, IconMeaningType.Danger
          )),
          position: new ResponsivePositioningConfigModel(new PositioningConfigPropsModel(DisplayType.Inline))
        }
      ]
*
*
*
*
* */
