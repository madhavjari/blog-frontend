import { jwtDecode } from "jwt-decode";

export default function checkUser(accessToken) {
  let username = null;
  if (accessToken) {
    try {
      const decoded = jwtDecode(accessToken);
      username = decoded.sub;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  return username;
}
