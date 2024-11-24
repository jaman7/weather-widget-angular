import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export type BtnTypes = 'button' | 'radio' | 'radio-item';
export type CheckboxTypes = 'weather' | 'tile';
export type TypesTooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'
  | Array<string>;

export interface ISidebarConfig {
  id?: number | string;
  level?: number;
  name?: string;
  title?: string;
  icon?: string;
  tooltipTitle?: string;
  tooltipPlacement?: TypesTooltipPlacement;
  additionalClass?: string;
  iconType?: string;
  type?: BtnTypes;
  typeCheckbox?: CheckboxTypes;
  source?: OSM;
  tile?: TileLayer;
  checked?: boolean;
  value?: number;
  children?: ISidebarConfig[];
}
