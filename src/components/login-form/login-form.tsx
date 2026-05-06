import './style.css';
import { ReactEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

const RegExp = {
  Email: /^[A-Za-z0-9._%+-]+@[A-Za-z-]+\.[A-Za-z]{2,}$/,
  Password: /^(?=.*[A-Za-zА-Яа-яЁё])(?=.*\d).{3,15}$/
} as const;

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [personalDataAgreement, setPersonalDataAgreement] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const dispatch = useAppDispatch();
  const formSubmitStatus = useAppSelector(selectUserRequestStatus);
  const isSubmitting = formSubmitStatus === RequestStatus.Loading;

  const isButtonDisabled = !personalDataAgreement || !formData.email || !formData.password;

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

  const handleFormSubmit: SubmitHandler<LoginFormData> = async (): Promise<void> => {
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
        handleSubmit(handleFormSubmit)(evt);
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
              placeholder="Адрес электронной почты"
              required
              value={formData.email}
              {...register('email', { pattern: RegExp.Email })}
              onChange={handleFormDataChange}
              disabled={isSubmitting}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email?.type === 'pattern' && <span className='login-form__error' role="alert">Укажите почту в формате example@email.com</span>}
          </div>
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="password">
                  Пароль
            </label>
            <input
              type="password"
              id="password"
              placeholder="Пароль"
              required
              value={formData.password}
              {...register('password', { pattern: RegExp.Password })}
              onChange={handleFormDataChange}
              disabled={isSubmitting}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password?.type === 'pattern' && <span className='login-form__error' role="alert">От 3 до 15 символов. Минимум одна буква и цифра.</span>}
          </div>
        </div>
        <button
          className="btn btn--accent btn--general login-form__submit"
          type="submit"
          disabled={isSubmitting || isButtonDisabled}
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
