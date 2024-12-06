import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CheckMark } from '../check-mark-circle-svgrepo-com.svg';


const FormPage = ({ onSubmission }) => {
  const [formData, setFormData] = useState({ ime: "",priimek: "" , email: "", cv: "" });
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})}

  const handleSubmit = () => {
    if (!formData.ime ||!formData.priimek || !formData.email || !formData.cv) {
      setError("Vsa polja morajo biti izpolnjena!");
      return;
    }

    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push(formData);
    localStorage.setItem("applications", JSON.stringify(applications));

    setError("");
    setIsSubmitted(true);
  };

  const handleNewSubmission = () => {
    setIsSubmitted(false);
    setFormData({ ime: "", priimek: "", email: "", cv: "" });
  };

  return (
    <div className='App'>
      {!isSubmitted ? (
    <div className='form-container'>
      <h2>ODDAJA VLOGE</h2>
      <p>Izpolnite spodnja polja in oddajte vlogo,<br/> če se želite potegovati za izbrano delovno mesto</p>
      <input
        type="text"
        name="ime"
        placeholder="Ime"
        defaultValue={formData.ime}
        onChange={handleChange}
      />
      <input
        type="text"
        name="priimek"
        placeholder="Priimek"
        defaultValue={formData.priimek}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Naslov"
        defaultValue={formData.email}
        onChange={handleChange}
      />
      <textarea
        name="cv"
        placeholder="Zakaj ste vi najbolj primeri za izbrano delo"
        defaultValue={formData.cv}
        onChange={handleChange}
        rows={10}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>ODDAJ</button>
    </div>
    ) : (
      <div className="form-container">
        <CheckMark className='checkmark'></CheckMark>
        <h2>VLOGA USPEŠNO ODDANA</h2>
        <p>
          Vaša vloga je bila oddana v preverjanje.
          <br />
          Po pregledu Vas bodo naši uslužbenci o rezultatu obvestili preko
          <br />
          elektronske pošte, ki je navedena v vašem uporabniškem profilu.
        </p>
        <button onClick={handleNewSubmission}>Nova oddaja</button>
      </div>
    )}
    <Link className='link' to={'/login'}>
      "Prijavite se kot administrator"
    </Link>
    </div>
  );
};

export default FormPage;
