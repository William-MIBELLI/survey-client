import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px -1px #A4ACB9",
        maxWidth: "600px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          paddingLeft: "1rem",
          rowGap: "3",
          backgroundColor: "#E6EFEF",
          borderRadius: "10px 10px 0 0"
        }}
      >
        <img
          src="./src/assets/nextone-green.svg"
          height={"40px"}
          width={"40px"}
          alt="NextONE Logo"
        />
        <h1
          style={{
            color: "#1F2511",
            fontWeight: "bolder",
          }}
        >
          NextONE
        </h1>
      </div>
      <div
        style={{
          color: "#6D6D6D",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "2rem",
          fontSize: "0.9rem"
        }}
      >
        <p>
          Une demande de réinitialisation de mot de passe a été effectué avec
          cette adresse email.
        </p>
        <p style={{
          fontWeight: "bold"
        }}>
          Pour finaliser la la demande, merci de cliquer sur le lien ci-dessous{" "}
        </p>
      </div>
      <a
        style={{
          padding: "0.7rem",
          borderRadius: "10px",
          backgroundColor: "#1F2511",
          border: "none",
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          alignSelf: "center"
        }}
        target="_blank"
        href="${uri}/resetpassword/${token}"
      >
        Réinitialiser le mot de passe
      </a>
      <p
        style={{
          fontSize: "0.6rem",
          color: "gray",
          fontStyle: "italic",
          paddingBottom: "1rem",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        Ceci est un email automatique, merci de ne pas y répondre
      </p>
    </div>
  );
}

export default App;
