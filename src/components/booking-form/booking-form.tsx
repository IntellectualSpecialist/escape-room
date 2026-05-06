import { ReactEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './style.css';
import { BookingFormData, PeopleMinMax, Slots } from '../../types';
import { convertTime, getBookingDataProperties } from '../../utils';
import { CheckboxAgreement } from '../../ui/checkbox-agreement/checkbox-agreement';
import { postBokingAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, RequestStatus } from '../../const';
import { toast } from 'react-toastify';
import { selectPlacesRequestFormStatus } from '../../store/booking/selectors';

type BookingFormProps = {
  places: Slots;
  placeId: string;
  offerId: string;
  peopleMinMax: PeopleMinMax;
}

type ChangeHandler = ReactEventHandler<HTMLInputElement>

enum SubmitButtonText {
  Idle = 'Забронировать',
  Sending = 'Отправляю...'
}

const RegExp = {
  Phone: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  Name: /^[А-Яа-яЁёA-Za-z]{1,15}$/
} as const;

const BookingForm = ({places, placeId, offerId, peopleMinMax}: BookingFormProps): JSX.Element => {
  const [formData, setFormData] = useState<BookingFormData>({
    date: 'today',
    time: '',
    contactPerson: '',
    withChildren: true,
    peopleCount: 0,
    placeId,
    phone: '',
  });
  const [personalDataAgreement, setPersonalDataAgreement] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();
  const dispatch = useAppDispatch();
  const formSubmitStatus = useAppSelector(selectPlacesRequestFormStatus);
  const isSubmitting = formSubmitStatus === RequestStatus.Loading;
  const [min, max] = peopleMinMax;

  const isButtonDisabled = !formData.time || !formData.contactPerson || !formData.phone || !formData.peopleCount || !personalDataAgreement;

  const navigate = useNavigate();
  const {today: todayItems, tomorrow: tomorrowItems} = places || {};

  const handleFormDataChange: ChangeHandler = (evt) => {
    const {name, value, checked} = evt.currentTarget;

    setFormData((prevForm) => ({
      ...prevForm,

      ...getBookingDataProperties(name, value, checked)
    }));
  };

  const handleAgreementChange: ChangeHandler = (evt) => {
    setPersonalDataAgreement(evt.currentTarget.checked);
  };

  const handleFormSubmit: SubmitHandler<BookingFormData> = async (): Promise<void> => {
    try {
      await dispatch(postBokingAction({formData, offerId})).unwrap();
      navigate(AppRoute.MyQuests);
    } catch(err) {
      toast.error('Ошибка отправки');
    }
  };

  const handleInputNumberWhell = (event: React.WheelEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  return (
    <form
      className="booking-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
      onSubmit={(evt) => {
        handleSubmit(handleFormSubmit)(evt);
      }}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div className="booking-form__date-inner-wrapper">
            {todayItems.map(({time, isAvailable}) => {
              const timeValue = convertTime('today', time);

              return (
                <label key={time} className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id={timeValue}
                    name="date"
                    required
                    defaultValue={timeValue}
                    disabled={!isAvailable || isSubmitting}
                    onChange={handleFormDataChange}
                    checked={convertTime(formData.date, formData.time) === timeValue}
                  />
                  <span className="custom-radio__label">{time}</span>
                </label>);
            })}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div className="booking-form__date-inner-wrapper">
            {tomorrowItems.map(({time, isAvailable}) => {
              const timeValue = convertTime('tomorrow', time);
              return (
                <label key={time} className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id={timeValue}
                    name="date"
                    required
                    defaultValue={timeValue}
                    disabled={!isAvailable || isSubmitting}
                    checked={convertTime(formData.date, formData.time) === timeValue}
                    onChange={handleFormDataChange}
                  />
                  <span className="custom-radio__label">{time}</span>
                </label>);
            })}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">
              Ваше имя
          </label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            required
            {...register('contactPerson', { pattern: RegExp.Name })}
            onChange={handleFormDataChange}
            disabled={isSubmitting}
            aria-invalid={errors.contactPerson ? 'true' : 'false'}
          />
          {errors.contactPerson?.type === 'pattern' && <span className='booking-form__error' role="alert">От 1 до 15 символов, только буквы</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">
              Контактный телефон
          </label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            required
            {...register('phone', { pattern: RegExp.Phone })}
            onChange={handleFormDataChange}
            disabled={isSubmitting}
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone?.type === 'pattern' && <span className='booking-form__error' role="alert">Номер формата +7 (000) 000-00-00 (Ру-формат)</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">
              Количество участников
          </label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            required
            {...register('peopleCount', { min, max })}
            onChange={handleFormDataChange}
            disabled={isSubmitting}
            onWheel={handleInputNumberWhell}
            aria-invalid={errors.peopleCount ? 'true' : 'false'}
          />
          {(errors.peopleCount?.type === 'min' || errors.peopleCount?.type === 'max') && <span className='booking-form__error' role="alert">{`От ${min} до ${max} человек`}</span>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="withChildren"
            defaultChecked
            onChange={handleFormDataChange}
            disabled={isSubmitting}
          />
          <span className="custom-checkbox__icon">
            <svg width={20} height={17} aria-hidden="true">
              <use xlinkHref="#icon-tick" />
            </svg>
          </span>
          <span className="custom-checkbox__label">
              Со&nbsp;мной будут дети
          </span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={isSubmitting || isButtonDisabled}
      >
        {isSubmitting ? SubmitButtonText.Sending : SubmitButtonText.Idle}
      </button>

      <CheckboxAgreement
        className='booking-form__checkbox booking-form__checkbox--agreement'
        onAgreementChange={handleAgreementChange}
        isChecked={personalDataAgreement}
        isDisabled={isSubmitting}
      />
    </form>
  );
};

export default BookingForm;
