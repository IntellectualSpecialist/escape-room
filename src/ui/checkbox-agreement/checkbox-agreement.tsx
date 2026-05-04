import { ReactEventHandler } from 'react';
import { Link } from 'react-router-dom';

type CheckboxAgreementProps = {
  className: string;
  onAgreementChange: (evt: React.SyntheticEvent<HTMLInputElement, Event>) => void;
  isChecked: boolean;
}

type ChangeHandler = ReactEventHandler<HTMLInputElement>

const CheckboxAgreement = ({className, onAgreementChange, isChecked}: CheckboxAgreementProps): JSX.Element => {
  const handleAgreementChange: ChangeHandler = (evt) => {
    onAgreementChange(evt);
  };

  return (
    <label className={`custom-checkbox ${className}`}>
      <input
        type="checkbox"
        id="id-order-agreement"
        name="user-agreement"
        required
        checked={isChecked}
        onChange={handleAgreementChange}
      />
      <span className="custom-checkbox__icon">
        <svg width={20} height={17} aria-hidden="true">
          <use xlinkHref="#icon-tick" />
        </svg>
      </span>
      <span className="custom-checkbox__label">
            Я&nbsp;согласен с{' '}
        <Link className="link link--active-silver link--underlined" to="#">
              правилами обработки персональных данных
        </Link>
            &nbsp;и пользовательским соглашением
      </span>
    </label>
  );
};

export {CheckboxAgreement};
