import { sessionService } from "redux-react-session";

export const login = (user, history) => {
  return () => {
    return fetch(`http://localhost:8080/api/authenticate`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(({ user, token }) => {
        localStorage.setItem("token", token);
        sessionService
          .saveSession(token)
          .then(() => {
            sessionService
              .saveUser(user)
              .then(() => {
                history.push("/dashboard");
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      });
  };
};

export const logout = history => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    localStorage.removeItem("token");
    history.push("/login");
  };
};
