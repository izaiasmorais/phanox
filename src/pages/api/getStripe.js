import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51LDBd4K6F9MAB56yno4uez2sO2nw06OHzA3ellAUeOplSPw1HEmuvjth7szgnr7W1U9X0GNEUeiGRLFPt2Zki0rl00YuGDQ5DG"
    );
  }

  return stripePromise;
};

export default getStripe;
