import {ActionIdType, ComponentNameType, FormTargetType} from "../types/type-aliases";
import {NoValueType} from "../enums/NoValueTypes.enum";

export class ServerAction {
  public constructor(
    public id:ActionIdType,
    public target?:
      ComponentNameType|
      FormTargetType|
      NoValueType.CALCULATED_BY_ENGINE|
      NoValueType.NO_VALUE_ALLOWED,
  ) {
  }
}
// todo denk ook is na over pagination => dit zijn properties die niets met het datarecord zelf te maken hebben
//      zoals ?page=4&limit=20
//      maw voorzie ook hardcoded params los van het datarecord at hand
