export interface IMenuConfig {
  id?: string;
  name?: string;
  title?: string;
  visible?: boolean;
  children?: IMenuConfig[];
  customLink?: string;
}
