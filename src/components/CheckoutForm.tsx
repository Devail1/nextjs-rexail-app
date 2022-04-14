import { Formik, Form, Field } from "formik";
import { useState } from "react";

interface Values {
  cardHolderName: string;
  cardHolderID: string;
  cardNumber: string;
  cardExpDate: string;
  cardCVV: string;
}

type Props = {
  currencySign: string;
  cartTotal: string;
};

const CheckoutForm = ({ currencySign, cartTotal }: Props) => {
  const [shouldSaveCardInfo, setShouldSaveCardInfo] = useState(true);

  const handleCardExpSlash = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 2) {
      e.target.value = e.target.value + "/";
    }
  };

  const handleFormFieldsValidations = (values: Values) => {
    const errors = {} as Values;

    if (!values.cardHolderName) {
      errors.cardHolderName = "Required";
    } else if (
      !/^[a-zA-Z\u0590-\u05FF\u200f\u200e]([-']?[a-zA-Z\u0590-\u05FF\u200f\u200e]+)*( [a-zA-Z\u0590-\u05FF\u200f\u200e]([-']?[a-zA-Z\u0590-\u05FF\u200f\u200e]+)*)+$/.test(
        values.cardHolderName
      )
    ) {
      errors.cardHolderName = "Invalid card holder name";
    }

    if (!values.cardHolderID) {
      errors.cardHolderID = "Required";
    } else if (!/^[0-9]{9}$/.test(values.cardHolderID)) {
      errors.cardHolderID = "Invalid card holder ID";
    }

    if (!values.cardNumber) {
      errors.cardNumber = "Required";
    } else if (
      !/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}(?:2131|1800|35\d{3})\d{11})$/.test(
        values.cardNumber
      )
    ) {
      errors.cardNumber = "Invalid card number";
    }

    if (!values.cardExpDate) {
      errors.cardExpDate = "Required";
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(values.cardExpDate)) {
      errors.cardExpDate = "Invalid card expiration date";
    }

    if (!values.cardCVV) {
      errors.cardCVV = "Required";
    } else if (!/^[0-9]{3,4}$/.test(values.cardCVV)) {
      errors.cardCVV = "Invalid card CVV";
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={{
          cardHolderName: "",
          cardHolderID: "",
          cardNumber: "",
          cardExpDate: "",
          cardCVV: "",
        }}
        validate={handleFormFieldsValidations}
        onSubmit={(values: Values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form noValidate autoComplete="off" className="checkout-form-wrapper mb-20">
            <div className="font-size-16 font-gray-900 text-weight-500">פרטי כרטיס אשראי</div>
            <div className="display-flex align-center justify-between mb-20">
              <div className="display-flex flex-vertical w-2-4">
                <label>
                  <span>שם בעל הכרטיס *</span>
                </label>
                <Field
                  name="cardHolderName"
                  className={
                    touched.cardHolderName && errors.cardHolderName
                      ? "invalid checkout-form-input"
                      : touched.cardHolderName && !errors.cardHolderName
                      ? "valid checkout-form-input"
                      : "checkout-form-input"
                  }
                />
              </div>
              <div className="display-flex flex-vertical w-2-4">
                <label>
                  <span>ת.ז. בעל הכרטיס *</span>
                </label>
                <Field
                  name="cardHolderID"
                  type="number"
                  className={
                    touched.cardHolderID && errors.cardHolderID
                      ? "invalid checkout-form-input"
                      : touched.cardHolderID && !errors.cardHolderID
                      ? "valid checkout-form-input"
                      : "checkout-form-input"
                  }
                />
              </div>
            </div>
            <div className="display-flex align-center justify-between mb-20">
              <div className="display-flex flex-vertical justify-between w-2-4">
                <label>
                  <span>מספר כרטיס אשראי *</span>
                </label>
                <Field
                  name="cardNumber"
                  type="number"
                  className={
                    touched.cardNumber && errors.cardNumber
                      ? "invalid checkout-form-input"
                      : touched.cardNumber && !errors.cardNumber
                      ? "valid checkout-form-input"
                      : "checkout-form-input"
                  }
                />
              </div>
              <div className="display-flex align-center justify-between w-2-4">
                <div className="display-flex flex-vertical w-2-4">
                  <label>
                    <span>תוקף *</span>
                  </label>
                  <Field
                    name="cardExpDate"
                    type="text"
                    placeholder="MM/YY"
                    onKeyUp={handleCardExpSlash}
                    className={
                      touched.cardExpDate && errors.cardExpDate
                        ? "invalid checkout-form-input"
                        : touched.cardExpDate && !errors.cardExpDate
                        ? "valid checkout-form-input"
                        : "checkout-form-input"
                    }
                  />
                </div>
                <div className="display-flex flex-vertical w-2-4 relative">
                  <label>
                    <span>CVV *</span>
                  </label>
                  <Field
                    name="cardCVV"
                    type="number"
                    className={
                      touched.cardCVV && errors.cardCVV
                        ? "invalid checkout-form-input"
                        : touched.cardCVV && !errors.cardCVV
                        ? "valid checkout-form-input"
                        : "checkout-form-input"
                    }
                  />
                  <img
                    className="h-20 w-20 absolute input-placeholder credit-card-svg"
                    src="/icons/icon-credit-card.svg"
                  />
                </div>
              </div>
            </div>
            <div className="display-flex align-center">
              <button
                type="button"
                className={shouldSaveCardInfo ? "checked custom-checkbox" : "unchecked custom-checkbox"}
                onClick={() => setShouldSaveCardInfo(!shouldSaveCardInfo)}
              ></button>
              <span className="font-size-14 font-gray-900 mt-2">
                שמור את פרטי כרטיס האשראי להזמנות עתידיות
              </span>
              <img className="mr-8 mt-2 font-green" src="/icons/icon-info-2.svg" />
            </div>
            <div className="user-message mt-25 display-flex align-center mb-40">
              <img src="/icons/icon-lock-dark.svg" />
              <div className="mr-8">
                <span>
                  הסליקה מתבצעת בצורה מאובטחת, פרטי התשלום מוגנים על ידי טכנולוגיות אבטחת מידע המתקדמות ביותר
                  בשיתוף פעולה עם חברת Credit Guard. &nbsp;
                  <span className="read-more-link">למד עוד</span>
                </span>
              </div>
            </div>
            <div className="display-flex justify-between">
              <button type="button" className="btn-secondary">
                חזרה לתיאום הגעה
              </button>
              <button
                type="submit"
                className="btn-primary display-flex align-center justify-center"
                disabled={isSubmitting || !!Object.values(errors).length || !Object.values(touched).length}
              >
                {console.log(!Object.values(touched).length)}
                <img className="w-20 h-20 ml-4" src="/icons/icon-lock-light.svg" />
                סיום הזמנה&emsp;|&emsp;
                {currencySign}
                {parseFloat(cartTotal) + 30}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
