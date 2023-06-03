export type ContactInput = {
  name: string;
  numbers: string[];
};
export type UpdateContactInput = ContactInput & {
  uid: string;
};
