export interface IContactInput {
  name: string;
  numbers: string[];
}
export interface IUpdateContactInput extends IContactInput {
  uid: string;
}
