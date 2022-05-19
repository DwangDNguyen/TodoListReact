import React, { useEffect } from "react";

const Alert = ({ show, type, mess, removeAlert }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(time);
  }, []);
  return <p className={`alert alert-${type}`}>{mess}</p>;
};

export default Alert;
