import { ReactEventHandler, useState } from 'react';
import { BookingFormData, Slots } from '../../types';
import { convertTime, getBookingDataProperties } from '../../utils';
import { CheckboxAgreement } from '../../ui/checkbox-agreement/checkbox-agreement';

type BookingFormProps = {
  slots: Slots;
  placeId: string;
}

type ChangeHandler = ReactEventHandler<HTMLInputElement>

const BookingForm = ({slots, placeId}: BookingFormProps): JSX.Element => {
  const [formData, setFormData] = useState<BookingFormData>({
    date: 'today',
    time: '',
    contactPerson: '',
    withChildren: true,
    peopleCount: 0,
    placeId: placeId,
    phone: '',
  });
  const [personalDataAgreement, setPersonalDataAgreement] = useState(false);
  const {today: todayItems, tomorrow: tomorrowItems} = slots;

  const handleFormDataChange: ChangeHandler = (evt) => {
    const {name, value, checked} = evt.currentTarget;

    setFormData({
      ...formData,

      ...getBookingDataProperties(name, value, checked)
    });
  };

  const handleAgreementChange: ChangeHandler = (evt) => {
    setPersonalDataAgreement(evt.currentTarget.checked);
  };

  return (
    <form
      className="booking-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
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
                    disabled={!isAvailable}
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
                    disabled={!isAvailable}
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
            name="name"
            placeholder="Имя"
            required
            pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
            onChange={handleFormDataChange}
          />
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">
              Контактный телефон
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            placeholder="Телефон"
            required
            pattern="[0-9]{10,}"
            onChange={handleFormDataChange}
          />
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">
              Количество участников
          </label>
          <input
            type="number"
            id="person"
            name="person"
            placeholder="Количество участников"
            required
            onChange={handleFormDataChange}
          />
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="children"
            defaultChecked
            onChange={handleFormDataChange}
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
      >
          Забронировать
      </button>

      <CheckboxAgreement
        className='booking-form__checkbox booking-form__checkbox--agreement'
        onAgreementChange={handleAgreementChange}
        isChecked={personalDataAgreement}
      />
    </form>
  );
};

export default BookingForm;
