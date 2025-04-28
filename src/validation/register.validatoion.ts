import * as yup from 'yup';

const registarionSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().required('email is required').email(),
  password: yup.string().required('pasword is also required').max(30).min(8),
});

export default registarionSchema;
