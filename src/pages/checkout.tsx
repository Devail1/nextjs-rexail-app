import { GetStaticProps, NextPage } from "next";
import CheckoutForm from "components/CheckoutForm";
import { useSelector } from "react-redux";

const Checkout: NextPage = () => {
  const store = useSelector((state: any) => state);
  const { cartTotal } = store.cart;
  const { currencySign } = store.config;

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
              <CheckoutForm currencySign={currencySign} cartTotal={cartTotal}></CheckoutForm>
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
                {currencySign}
                {cartTotal}
              </span>
            </div>
            <div className="display-flex justify-between align-center my-6">
              <span className="font-size-15 font-gray-600">הנחת קופון</span>
              <span className="font-size-16 font-heebo">
                {currencySign}
                60.00-
              </span>
            </div>
            <div className="display-flex justify-between align-center my-6">
              <span className="font-size-15 font-gray-600">משלוח</span>
              <span className="font-size-16 font-heebo">
                {currencySign}
                30.00
              </span>
            </div>
            <div className="display-flex justify-between align-center my-6">
              <span className="font-size-15 font-gray-600 text-weight-500">סה״כ לתשלום</span>
              <span className="font-size-16 font-heebo text-weight-500">
                {currencySign}
                {parseFloat(cartTotal) + 30}
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
