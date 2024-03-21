// Interface for a single field in the form
export interface IFields {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  //Can add multiple key as per need. e.g - isError, errorMsg, isMandatory
}

// Interface representing the entire form with its fields
export interface IPostScreenFieldsData {
  title: IFields;
  description: IFields;
  //Add on the other fields of the form
}

// Initial values for the form fields
export const postScreenFields: IPostScreenFieldsData = {
  title: {
    key: 'title',
    label: 'Title',
    placeholder: 'Enter Title',
    value: '',
  },
  description: {
    key: 'description',
    label: 'Description',
    placeholder: 'Enter Description',
    value: '',
  },
};
export const initialState: IFields[] = [
  {
    key: 'title',
    label: 'Title',
    placeholder: 'Enter Title',
    value: '',
  },
  {
    key: 'description',
    label: 'Description',
    placeholder: 'Enter Description',
    value: '',
  },
];
