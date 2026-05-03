import { ReactEventHandler, useCallback, useState } from 'react';
import { CheckboxAgreement } from '../../ui/checkbox-agreement/checkbox-agreement';
import { LoginFormData } from '../../types';

type ChangeHandler = ReactEventHandler<HTMLInputElement>

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [personalDataAgreement, setPersonalDataAgreement] = useState(false);

  const handleFormDataChange: ChangeHandler = (evt) => {
    const {name, value} = evt.currentTarget;

    setFormData({
      ...formData,

      [name]: value
    });
  };

  const handleAgreementChange: ChangeHandler = useCallback((evt) => {
    setPersonalDataAgreement(evt.currentTarget.checked);
  }, []);

  return (
    <form
      className="login-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
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
      {/* <label className="custom-checkbox login-form__checkbox">
      <input
        type="checkbox"
        id="id-order-agreement"
        name="user-agreement"
        required
      />
      <span className="custom-checkbox__icon">
        <svg width={20} height={17} aria-hidden="true">
          <use xlinkHref="#icon-tick" />
        </svg>
      </span>
      <span className="custom-checkbox__label">
              Я&nbsp;согласен с
        <a className="link link--active-silver link--underlined" href="#">
                правилами обработки персональных данных
        </a>
              &nbsp;и пользовательским соглашением
      </span>
    </label> */}
      <CheckboxAgreement
        className="login-form__checkbox"
        onAgreementChange={handleAgreementChange}
        isChecked={personalDataAgreement}
      />
    </form>
  );
};

export default LoginForm;
