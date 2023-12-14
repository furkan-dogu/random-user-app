import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import furkan from "./assets/furkan-logo.png";
import Footer from "./components/footer/Footer";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [userAdd, setUserAdd] = useState([])

  const url = "https://randomuser.me/api/";

  const getUser = () => {
    axios(url)
      .then((res) => {
        setUser(res.data.results[0]);
      })
      .catch((err) => console.log(err));

      setValue("")
      setTitle("name")
  };

  useEffect(() => {
    getUser();
  }, []);


  const { picture, name, email, gender, dob, location, phone, login } = user;

  const handleName = () => {
    setTitle("name");
    setValue(`${name?.first} ${name?.last}`);
  };

  const handleEmail = () => {
    setTitle("email");
    setValue(email);
  };

  const handleAge = () => {
    setTitle("age");
    setValue(dob?.age);
  };

  const handleStreet = () => {
    setTitle("street");
    setValue(location?.street.name);
  };

  const handlePhone = () => {
    setTitle("phone");
    setValue(phone);
  };

  const handlePassword = () => {
    setTitle("password");
    setValue(login?.password);
  };

  const handleClick = () => {
    const newUser = {
      name: name?.first,
      email: email,
      phone: phone,
      age: dob?.age,
    }

    const control = userAdd.some((item) => item.name === newUser.name && item.email === newUser.email)

    if(control) {
      alert("This user is already added.")
    } else {
      setUserAdd([...userAdd, newUser])
    }

  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={furkan} alt="furkan" id="furkan" />
      </div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} alt="random user" className="user-img" />
          <p className="user-title">My {title || "name"} is</p>
          <p className="user-value">{value || `${name?.first} ${name?.last}`}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img
                src={gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
                onMouseEnter={handleName}
              />
            </button>
            <button className="icon" data-label="email">
              <img
                src={mailSvg}
                alt="mail"
                id="iconImg"
                onMouseEnter={handleEmail}
              />
            </button>
            <button className="icon" data-label="age">
              <img
                src={gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
                onMouseEnter={handleAge}
              />
            </button>
            <button className="icon" data-label="street">
              <img
                src={mapSvg}
                alt="map"
                id="iconImg"
                onMouseEnter={handleStreet}
              />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                onMouseEnter={handlePhone}
              />
            </button>
            <button className="icon" data-label="password">
              <img
                src={padlockSvg}
                alt="lock"
                id="iconImg"
                onMouseEnter={handlePassword}
              />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleClick}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {userAdd.map(({name, email, phone, age}) => (
                <tr className="body-tr">
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{age}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
