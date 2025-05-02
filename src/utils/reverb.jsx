import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const getToken = () => {
  return localStorage.getItem("token");
};

const echo = new Echo({
  broadcaster: "reverb",
  key: "f4l2tmwqf6eg0f6jz0mw",
  wsHost: "hr-mentor.techbutomy.com", // Ensure this domain is correct
  wsPort: 8084, // Replace with the correct port number
  disableStats: true,
  forceTLS: true, // Set to true if using wss
  enabledTransports: ['ws', 'wss'], // Explicitly enable WebSockets
  authEndpoint: 'https://hr-mentor.techbutomy.com/api/broadcasting/auth', // Ensure this endpoint is correct
  auth: {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  },
});

export default echo;