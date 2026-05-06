import { FormEvent, ReactEventHandler, useState } from 'react';
import { CheckboxAgreement } from '../../ui/checkbox-agreement/checkbox-agreement';
import { LoginFormData } from '../../types';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';
import { selectUserRequestStatus } from '../../store/user/selectors';
import { RequestStatus } from '../../const';

type ChangeHandler = ReactEventHandler<HTMLInputElement>

enum SubmitButtonText {
  Idle = 'Войти',
  Sending = 'Отправляю...'
}

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [personalDataAgreement, setPersonalDataAgreement] = useState(false);
  const dispatch = useAppDispatch();
  const formSubmitStatus = useAppSelector(selectUserRequestStatus);
  const isSubmitting = formSubmitStatus === RequestStatus.Loading;

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


  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();

    try {
      await dispatch(loginAction(formData)).unwrap();
    } catch(err) {
      toast.error('Ошибка отправки');
    }
  };

  return (
    <form
      className="login-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={(evt) => {
        handleFormSubmit(evt);
      }}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
        </div>
        <button
          className="btn btn--accent btn--general login-form__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? SubmitButtonText.Sending : SubmitButtonText.Idle}
        </button>
      </div>
      <CheckboxAgreement
        className="login-form__checkbox"
        onAgreementChange={handleAgreementChange}
        isChecked={personalDataAgreement}
        isDisabled={isSubmitting}
      />
    </form>
  );
};

export default LoginForm;
