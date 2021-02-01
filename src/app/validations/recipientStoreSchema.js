import * as Yup from 'yup';

const recipientStoreSchema = Yup.object().shape({
  name: Yup.string().max(50).required(),
  street: Yup.string().max(100).required(),
  number: Yup.string().max(30).required(),
  state: Yup.string().max(2).required(),
  city: Yup.string().max(30).required(),
  zip_code: Yup.string().length(8).required(),
});

export default recipientStoreSchema;
