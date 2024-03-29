import useSWR from "swr";
import axios from "../helpers/axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  let navigate = useNavigate();
  let params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "/api/v1/user",
    () =>
      axios
        .get("/api/user")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;
        }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);
    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;
        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout");
      mutate();
    }
    window.location.pathname = "/";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      navigate(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};
