import * as Yup from 'yup';

const recipientUpdateSchema = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string().required(),
  street: Yup.string().min(5).max(200).required(),
  number: Yup.string().required(),
  state: Yup.string().length(2).required(),
  city: Yup.string().min(3).max(50).required(),
  zip_code: Yup.string().length(8).required(),
});

export default recipientUpdateSchema;
