import Axios from "axios";

const API = Axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      location.href = "/";
    }

    return Promise.reject(err);
  }
);

export const login = (firebaseToken) => {
  return API.post(
    "/login",
    {},
    { headers: { Authorization: `Bearer ${firebaseToken}` } }
  );
};

export const getCalendarEvent = () => {
  return API.get("/calendar/auth");
};

export const getChatAnswer = (text) => {
  return API.post("/chat/textQuery", { text });
};
