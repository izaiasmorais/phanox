import { loadStripe } from "@stripe/stripe-js";

export async function getStripe() {
  const getStripe = await loadStripe(
    "pk_test_51LDBd4K6F9MAB56yno4uez2sO2nw06OHzA3ellAUeOplSPw1HEmuvjth7szgnr7W1U9X0GNEUeiGRLFPt2Zki0rl00YuGDQ5DG"
  );

  return getStripe;
}
