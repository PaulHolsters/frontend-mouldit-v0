import {Effect} from "../../effectclasses/Effect";
import {TriggerType} from "../../enums/triggerTypes.enum";
import {Action} from "../../effectclasses/Action";
import {ActionType} from "../../enums/actionTypes.enum";
import {NoValueType} from "../../enums/NoValueTypes.enum";
import {StateService} from "../../services/state.service";
import {PropertyName} from "../../enums/PropertyNameTypes.enum";
import {ActionValueModel} from "../../design-dimensions/ActionValueModel";
import {Trigger} from "../../effectclasses/Trigger";
import {ServerAction} from "../../effectclasses/ServerAction";
import {EventsService} from "../../services/events.service";
import {CursorValues} from "../../enums/cursorValues.enum";
import {BackgroundColorType} from "../../enums/backgroundColorType.enum";
import {BorderColorType} from "../../enums/borderColorType.enum";
import {BorderWidthType} from "../../enums/borderWidthType.enum";
import {Message} from "primeng/api";

// todo als de scherm breedte manueel gewijzigd wordt dan gaan bepaalde opstart eigenschappen niet meegenomen worden
//  zoals deze compute property
const setFooterHeight = (stateService: StateService, data: any): string => {
  return getComputedStyle(data.el.nativeElement).height // 50px
}
const allowDetails = (eventService: EventsService,data:any):boolean =>{
  return !(eventService.hasEffect(['removing movie from my list',data[1]])
    || eventService.hasEffect(['adding movie to my list',data[1]]))
}
const setCardWidth = (stateService: StateService): string | undefined => {
  const noc = stateService.getNumberOfComponents('movie-card')
  if (noc > 0) {
    let widthstr = getComputedStyle(stateService.getValue('movie-card', PropertyName.elRef, 0).el.nativeElement.parentElement).width
    let max: number = Number(widthstr.substring(0, widthstr.lastIndexOf('px')))
    for (let i = 1; i < noc; i++) {
      widthstr = getComputedStyle(stateService.getValue('movie-card', PropertyName.elRef, i).el.nativeElement.parentElement).width
      if (max < Number(widthstr.substring(0, widthstr.lastIndexOf('px')))) max = Number(widthstr.substring(0, widthstr.lastIndexOf('px')))
    }
    return max + 'px'
  }
  return undefined
}
const toastConstructMovieAdded = (data: {
  data: { _id: string, titel: string }, error?: {
    errorcode: number, errorMessage: string;
  }
}): Message => {
  if (data.error && data.error.errorcode !== 200 && data.error.errorcode !== 201) {
    return {
      severity: 'error',
      summary: 'Probleem',
      detail: data.error.errorMessage
    }
  }
  debugger
  return {
    severity: 'success',
    detail: 'Film ' + data.data.titel + ' werd toegevoegd aan jouw lijst'
  }
}
export const effects: Effect[] = [
  new Effect(
    new Trigger(TriggerType.ComponentReady,'menu'),
    // todo maak verschillende soorten acties zodat je nergens als parameter een novaluetype moet meegeven
    new Action(
      'UI-setFooterHeight',
      ActionType.SetRenderProperty,
      'footer',
      NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.height,setFooterHeight))),
  new Effect(
    new Trigger(TriggerType.LastIndexedComponentRendered, 'movie-card'),
    new Action(
      'UI-card-width',
      ActionType.SetRenderProperty,
      ['movie-card', true],
      NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.width, setCardWidth)
    )
  ),
  new Effect(
    new Trigger(TriggerType.MenuItemSelected,['menu','films']),
    new ServerAction('getAllMovies','content')
  ),
  new Effect(
    new Trigger(TriggerType.ComponentClicked,'remove'),
    new ServerAction('removeMovieFromList','content'),
    'removing movie from my list'
  ),
  new Effect(
    new Trigger(TriggerType.ComponentClicked,'add'),
    new ServerAction('addMovieToList','content'),
    'adding movie to my list'
  ),
  new Effect(
    new Trigger(TriggerType.ComponentClicked,'movie-card','movie-card-clicked',allowDetails),
    new Action('showMovieDetails',ActionType.SetRenderProperty,'movie-details-dialog',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.visible, true)),
    NoValueType.NO_VALUE_NEEDED
  ),
  new Effect(
    new Trigger(TriggerType.ComponentEntered,'movie-card'),
    new Action('set background',ActionType.SetRenderProperty,'movie-card',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.backgroundColor, BackgroundColorType.Highlight))
  ),
  new Effect(
    new Trigger(TriggerType.ComponentEntered,'movie-card'),
    new Action('set background',ActionType.SetRenderProperty,'movie-card',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.borderColor, BorderColorType.Primary))
  ),
  new Effect(
    new Trigger(TriggerType.ComponentEntered,'movie-card'),
    new Action('set background',ActionType.SetRenderProperty,'movie-card',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.borderWidth, BorderWidthType.Width_2))
  ),
  new Effect(
    new Trigger(TriggerType.ComponentLeft,'movie-card'),
    new Action('set background',ActionType.SetRenderProperty,'movie-card',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.backgroundColor, BackgroundColorType.Default))
  ),
  new Effect(
    new Trigger(TriggerType.ComponentLeft,'movie-card'),
    new Action('set background',ActionType.SetRenderProperty,'movie-card',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.borderColor, BorderColorType.Default))
  ),
  new Effect(
    new Trigger(TriggerType.ComponentLeft,'movie-card'),
    new Action('set background',ActionType.SetRenderProperty,'movie-card',NoValueType.NO_VALUE_ALLOWED,
      new ActionValueModel(PropertyName.borderWidth, BorderWidthType.No_width))
  ),
]
