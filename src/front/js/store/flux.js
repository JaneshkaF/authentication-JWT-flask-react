const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: "",
      verifiedUser: false,
    },
    actions: {
      // Use getActions to call a function within a fuction
      getToken: (email, password) => {
        fetch(process.env.BACKEND_URL + "/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => setStore({ token: result.token }))
          .catch((err) => console.log(err));
      },
      getVerified: () => {
        fetch(process.env.BACKEND_URL + "/api/protected", {
          method: "GET",
          headers: {
            authorization: "Bearer " + getStore().token,
          },
          redirect: "follow",
        })
          .then((res) => (res.ok ? setStore({ verifiedUser: true }) : ""))
          .catch((err) => console.log(err));
      },
    },
  };
};

export default getState;
