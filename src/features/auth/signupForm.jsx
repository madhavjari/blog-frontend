import { useState } from "react";
import styles from "./auth.module.css";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://blog-backend-production-e9b5.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(data.message || "Invalid inputs");
      }
      alert("Registered successful!");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Secure Access</p>
          <h1 className={styles.title}>Welcome</h1>
          <p className={styles.subtitle}>
            Register to start writing on the dashboard.
          </p>
        </header>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="firstName">
              First Name*
            </label>
            <input
              className={styles.input}
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              required
              minLength={2}
              maxLength={30}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="lastName">
              Last Name*
            </label>
            <input
              className={styles.input}
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              required
              minLength={2}
              maxLength={30}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email*
            </label>
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              value={email}
              required
              minLength={2}
              maxLength={30}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username*
            </label>
            <input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              value={username}
              required
              minLength={2}
              maxLength={30}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password*
            </label>
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              value={password}
              required
              minLength={8}
              maxLength={30}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
