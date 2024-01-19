import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import { useUser } from "../context/UserContext";
import { Button } from "react-bootstrap"
import axios from "axios"

const UserDetails = () => {
  const { User, Data, setData } = useUser();
  const sendInvoice = (invoiceData) => {
    const datatoSend = {
      email: User.email,
      invoiceData: invoiceData,
      name: User.name
    }
    console.log(datatoSend)
    axios.post("https://invoice-backend-c8m6.onrender.com/generate-invoice", datatoSend)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error generating invoice:", error);
      });
  };
  useEffect(() => {
    fetch("https://invoice-backend-c8m6.onrender.com/usageAndBilling")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <main className="table">
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th> Id </th>
              <th> Plan </th>
              <th> Usage </th>
              <th> Time </th>
              <th> Date </th>
              <th> Amount </th>
              <th> Invoice </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((value) => {
              return (
                <tr>
                  <td>{value.id}</td>
                  <td>{value.plan}</td>
                  <td> {value.usage} </td>
                  <td>{value.time}</td>
                  <td>{value.date}</td>
                  <td>
                    <strong>{value.amount}</strong>
                  </td>
                  <td><Button variant="primary" onClick={() => sendInvoice(value)}>Send Inoive</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default UserDetails;
