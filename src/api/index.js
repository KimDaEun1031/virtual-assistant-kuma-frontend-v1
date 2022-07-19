import Axios from "axios";

const API = Axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Token = localStorage.getItem("token");
  } else if (localStorage.getItem("code")) {
    req.headers.Code = localStorage.getItem("code");
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

export const getToken = (code) => {
  return API.get("/calendar/token", {}, { headers: { code } });
};

export const getTodayEvent = () => {
  return API.get("/calendar/event");
};

export const createEvent = (summary, date) => {
  return API.post("/calendar/event", { summary, date });
};

export const getChatAnswer = (text) => {
  return API.post("/chat/textQuery", { text });
};

export const updateUser = (email, name, character) => {
  return API.patch("/user", { email, name, character });
};

export const getWeatherInfo = () => {
  return API.get("/weather");
};
