import CheckoutForm from "components/CheckoutForm";
import { TCartState } from "hooks/useCartState";
import { GetStaticProps, NextPage } from "next";

type Props = {
  cartState: TCartState;
};

const Checkout: NextPage<Props> = ({ cartState }) => {
  console.log("file: checkout.tsx ~ line 8 ~ checkout ~ cartState", cartState);

  return (
    <div className="main-bg">
      <div className="container mx-auto pt-25">
        <div className="wizard-steps-container display-flex align-center justify-around font-white">
          <div className="display-flex align-center">
            <img src="/icons/progress-bar-completed.svg" />
            <div className="mr-10 font-size-16 text-weight-500">פרטים אישיים</div>
          </div>
          <div className="display-flex align-center">
            <img src="/icons/progress-bar-completed.svg" />
            <div className="mr-10 font-size-16 text-weight-500">תיאום הגעה</div>
          </div>
          <div className="display-flex align-center">
            <div className="w-36 h-36 circle-icon bg-white font-blue font-size-18 font-heebo text-center text-weight-500">
              3
            </div>
            <div className="mr-10 font-size-16 text-weight-500">תשלום</div>
          </div>
        </div>
        <div className="widget-wrapper">
          <div className="checkout-widget rounded-10">
            <div>
              <div className="text-title font-blue mb-12">תשלום</div>
              <span className="font-size-16 font-gray-900 text-weight-500">בחרו אמצעי תשלום</span>
              <div className="display-flex justify-evenly mt-14 mb-20">
                <button
                  type="button"
                  className="wizard-step-wrapper display-flex flex-vertical align-center justify-center active"
                >
                  <img src="/icons/icon-credit-card-2.svg" />
                  <span>כרטיס אשראי</span>
                </button>
                <button
                  type="button"
                  className="wizard-step-wrapper display-flex flex-vertical align-center justify-center"
                >
                  <img src="/icons/icon-cash.svg" />
                  <span>מזומן</span>
                </button>
                <button
                  type="button"
                  className="wizard-step-wrapper display-flex flex-vertical align-center justify-center"
                >
                  <img src="/icons/icon-cycle.svg" />
                  <span>תשלום בהקפה</span>
                </button>
                <button
                  type="button"
                  className="wizard-step-wrapper display-flex flex-vertical align-center justify-center"
                >
                  <img src="/icons/icon-no-payment.svg" />
                  <span>ללא תשלום</span>
                </button>
              </div>
              <CheckoutForm
                currencySign={cartState.currencySign}
                cartTotal={cartState.cartTotal}
              ></CheckoutForm>
              {/* <form name="form" className="checkout-form-wrapper mb-20">
                <div className="font-size-16 font-gray-900 text-weight-500">פרטי כרטיס אשראי</div>
                <div className="display-flex align-center justify-between mb-20">
                  <div className="display-flex flex-vertical w-2-4">
                    <label for="cardHolderName">
                      <span>שם בעל הכרטיס *</span>
                    </label>
                    <input
                      className="checkout-form-input"
                      type="text"
                      id="cardHolderName"
                      name="cardHolderName"
                      // ng-required="true"
                      // ng-pattern="/^[a-zA-Z\u0590-\u05FF\u200f\u200e]([-']?[a-zA-Z\u0590-\u05FF\u200f\u200e]+)*( [a-zA-Z\u0590-\u05FF\u200f\u200e]([-']?[a-zA-Z\u0590-\u05FF\u200f\u200e]+)*)+$/"
                      // ng-model="ctrl.state.formControl.cardHolderName"
                      // ng-className="{'invalid': form.cardHolderName.$touched && (form.cardHolderName.$error.required || form.cardHolderName.$error.pattern), 'valid': !form.cardHolderName.$error.required && !form.cardHolderName.$error.pattern}"
                    />
                  </div>
                  <div className="display-flex flex-vertical w-2-4">
                    <label for="cardHolderID">
                      <span>ת.ז. בעל הכרטיס *</span>
                    </label>
                    <input
                      className="checkout-form-input"
                      type="number"
                      id="cardHolderID"
                      name="cardHolderID"
                      // ng-required="true"
                      // ng-pattern="/^[0-9]{9}$/"
                      // ng-model="ctrl.state.formControl.cardHolderID"
                      // ng-className="{'invalid': form.cardHolderID.$touched && (form.cardHolderID.$error.required || form.cardHolderID.$error.pattern), 'valid': !form.cardHolderID.$error.required && !form.cardHolderID.$error.pattern}"
                    />
                  </div>
                </div>
                <div className="display-flex align-center justify-between mb-20">
                  <div className="display-flex flex-vertical justify-between w-2-4">
                    <label for="cardNumber">
                      <span>מספר כרטיס אשראי *</span>
                    </label>
                    <input
                      className="checkout-form-input"
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      // ng-required="true"
                      // ng-pattern="/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}(?:2131|1800|35\d{3})\d{11})$/"
                      // ng-model="ctrl.state.formControl.cardNumber"
                      // ng-className="{'invalid': form.cardNumber.$touched && (form.cardNumber.$error.required || form.cardNumber.$error.pattern), 'valid': !form.cardNumber.$error.required && !form.cardNumber.$error.pattern}"
                    />
                  </div>
                  <div className="display-flex align-center justify-between w-2-4">
                    <div className="display-flex flex-vertical w-2-4">
                      <label>
                        <span>תוקף *</span>
                      </label>
                      <input
                        className="checkout-form-input"
                        type="text"
                        placeholder="MM/YY"
                        id="cardExpDate"
                        name="cardExpDate"
                        // ng-required="true"
                        // ng-pattern="/^(0[1-9]|1[0-2])\/?([0-9]{2})$/"
                        // ng-keyup="ctrl.addSlashExp()"
                        // ng-model="ctrl.state.formControl.cardExpDate"
                        // ng-className="{'invalid': form.cardExpDate.$touched && (form.cardExpDate.$error.required || form.cardExpDate.$error.pattern), 'valid': !form.cardExpDate.$error.required && !form.cardExpDate.$error.pattern}"
                      />
                    </div>
                    <div className="display-flex flex-vertical w-2-4 relative">
                      <label for="cardCVV">
                        <span>CVV *</span>
                      </label>
                      <input
                        className="checkout-form-input"
                        type="text"
                        id="cardCVV"
                        name="cardCVV"
                        // ng-required="true"
                        // ng-pattern="/^[0-9]{3,4}$/"
                        // ng-model="ctrl.state.formControl.cardCVV"
                        // ng-className="{'invalid': form.cardCVV.$touched && (form.cardCVV.$error.required || form.cardCVV.$error.pattern), 'valid': !form.cardCVV.$error.required && !form.cardCVV.$error.pattern}"
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
                    className="custom-checkbox"
                    // ng-click="ctrl.state.shouldSaveCardInfoCheckbox = !ctrl.state.shouldSaveCardInfoCheckbox"
                    // ng-className="{'checked': ctrl.state.shouldSaveCardInfoCheckbox, 'unchecked': !ctrl.state.shouldSaveCardInfoCheckbox}"
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
                      הסליקה מתבצעת בצורה מאובטחת, פרטי התשלום מוגנים על ידי טכנולוגיות אבטחת מידע המתקדמות
                      ביותר בשיתוף פעולה עם חברת Credit Guard. &nbsp;
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
                    ng-disabled="form.$invalid"
                  >
                    <img className="w-20 h-20 ml-4" src="/icons/icon-lock-light.svg" />
                    סיום הזמנה&emsp;|&emsp;
                    {cartState.currencySign}
                    {parseFloat(cartState.cartTotal) + 30}
                  </button>
                </div>
              </form> */}
            </div>
          </div>
          <div className="order-summary rounded-10">
            <span className="font-heebo text-lgr text-weight-700 font-blue mobile-hide py-5 my-5 border-bottom-gray-2px">
              סיכום הזמנה
            </span>
            <div className="display-flex align-center justify-between border-bottom-gray-2px">
              <div className="display-flex flex-vertical my-18">
                <span className="font-size-13 font-gray-600">הערות למכין ההזמנה</span>
                <span className="font-size-15 font-gray-900">חסה טריה, גזרים קטנים, עגבניות…</span>
              </div>
              <img className="c-p" src="/icons/icon-edit.svg" />
            </div>
            <div className="display-flex align-center justify-between border-bottom-gray-2px">
              <div className="display-flex flex-vertical my-18">
                <span className="font-size-13 font-gray-600">קוד קופון</span>
                <span className="font-size-15 font-gray-900">sweetapple20%</span>
                <span className="font-size-15 font-gray-600">חסכתם 60 ש״ח (20%)</span>
              </div>
              <img className="c-p" src="/icons/icon-edit.svg" />
            </div>
            <div className="display-flex align-center justify-between border-bottom-gray-2px">
              <div className="display-flex flex-vertical my-18">
                <span className="font-size-13 font-gray-600">פרטים אישיים</span>
                <span className="font-size-15 font-gray-900">
                  אינסה מלייב
                  <br />
                  inesa@rexail.com
                </span>
              </div>
              <img className="c-p" src="/icons/icon-edit.svg" />
            </div>
            <div className="display-flex align-center justify-between border-bottom-gray-2px">
              <div className="display-flex flex-vertical my-18">
                <span className="font-size-13 font-gray-600">כתובת</span>
                <span className="font-size-15 font-gray-900">
                  דרך משה דיין 20, תל אביב <br />
                  קומה 3, דירה 10
                </span>
              </div>
              <img className="h-18 w-18 c-p" src="/icons/icon-edit.svg" />
            </div>
            <div className="display-flex align-center justify-between border-bottom-gray-2px">
              <div className="display-flex flex-vertical my-18">
                <span className="font-size-13 font-gray-600">משלוח</span>
                <span className="font-size-15 font-gray-900">
                  חמישי 22.10
                  <br />
                  בין השעות 12:00-16:00
                </span>
              </div>
              <img className="h-18 w-18 c-p" src="/icons/icon-edit.svg" />
            </div>
            <div className="display-flex justify-between align-center mt-25">
              <span className="font-size-15 font-gray-600">סה״כ סל קניות</span>
              <span className="font-size-16 font-heebo">
                {cartState.currencySign}
                {cartState.cartTotal}
              </span>
            </div>
            <div className="display-flex justify-between align-center my-6">
              <span className="font-size-15 font-gray-600">הנחת קופון</span>
              <span className="font-size-16 font-heebo">
                {cartState.currencySign}
                60.00-
              </span>
            </div>
            <div className="display-flex justify-between align-center my-6">
              <span className="font-size-15 font-gray-600">משלוח</span>
              <span className="font-size-16 font-heebo">
                {cartState.currencySign}
                30.00
              </span>
            </div>
            <div className="display-flex justify-between align-center my-6">
              <span className="font-size-15 font-gray-600 text-weight-500">סה״כ לתשלום</span>
              <span className="font-size-16 font-heebo text-weight-500">
                {cartState.currencySign}
                {parseFloat(cartState.cartTotal) + 30}
              </span>
            </div>
            <div className="text-center">
              <span className="font-darkgray font-size-14">שערוך. עלות סופית לפי שקילה.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};
