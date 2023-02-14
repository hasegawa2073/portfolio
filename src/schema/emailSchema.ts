import * as yup from 'yup';

export const emailSchema = yup.object().shape({
  name: yup.string().required('名前を入力してください'),
  email: yup
    .string()
    .email('メールアドレスの形式が不正です')
    .required('メールアドレスを入力してください'),
  text: yup.string().required('お問い合わせ内容を入力してください'),
});
