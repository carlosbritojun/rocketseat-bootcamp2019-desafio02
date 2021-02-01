import * as Yup from 'yup';

const sessionStoreSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default sessionStoreSchema;
