import { FormEventHandler, ReactEventHandler, useState } from 'react';
import { CheckboxAgreement } from '../../ui/checkbox-agreement/checkbox-agreement';
import { LoginFormData } from '../../types';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type ChangeHandler = ReactEventHandler<HTMLInputElement>
type SubmitHandler = FormEventHandler<HTMLFormElement>

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [personalDataAgreement, setPersonalDataAgreement] = useState(false);
  const dispatch = useAppDispatch();

  const handleFormDataChange: ChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;

    setFormData({
      ...formData,

      [name]: value
    });
  };

  const handleAgreementChange: ChangeHandler = (evt) => {
    setPersonalDataAgreement(evt.currentTarget.checked);
  };

  const handleFormSubmit: SubmitHandler = (evt) => {
    evt.preventDefault();
    dispatch(loginAction(formData));
  };

  return (
    <form
      className="login-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <div className="login-form__inner-wrapper">
        <h1 className="title title--size-s login-form__title">Вход</h1>
        <div className="login-form__inputs">
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="email">
                  E&nbsp;–&nbsp;mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Адрес электронной почты"
              required
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </div>
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="password">
                  Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Пароль"
              required
              value={formData.password}
              onChange={handleFormDataChange}
            />
          </div>
        </div>
        <button
          className="btn btn--accent btn--general login-form__submit"
          type="submit"
        >
              Войти
        </button>
      </div>
      <CheckboxAgreement
        className="login-form__checkbox"
        onAgreementChange={handleAgreementChange}
        isChecked={personalDataAgreement}
      />
    </form>
  );
};

export default LoginForm;
