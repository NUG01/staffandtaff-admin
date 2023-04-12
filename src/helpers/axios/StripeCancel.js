import axios from "axios";
const StripeAxios = axios.create({
  baseURL: "https://api.stripe.com/v1/subscriptions/",
  headers: {
    Authorization:
      "Bearer sk_test_51MRB4YGAxhWdhlP5ZGltSAV8oWh4PVZNtpFNkQu1ecvYNbTskzNhiTe48jm86bf9Mg3j6BJEnoRneZYB3kJCwxqI00YVgPy94o",
  },
});

export default StripeAxios;
