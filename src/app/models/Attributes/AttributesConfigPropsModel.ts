import {MenuItem} from "primeng/api";
import {ComponentModel} from "../ComponentModel";

export class AttributesConfigPropsModel {
  constructor(
    public src?: string,
    public alt?: string,
    public name?: string,
    public width?: number,
    public menuItems?: MenuItem[],
    public start?: ComponentModel,
    public end?: ComponentModel,
    public content?: ComponentModel,
    public dataLink?:string[]
  ) {
  }
}
