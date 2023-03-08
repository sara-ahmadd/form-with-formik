import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Cart from "./Cart";
import * as Yup from "yup";
import React, { useState } from "react";

export const TotalCostContext = React.createContext();

function FormComponent() {
  let user = {
    name: "User",
    email: "email@gmail.com",
  };

  let toDay = new Date();
  let day = toDay.getDate();
  let month = toDay.getMonth() + 1;
  let year = toDay.getFullYear();

  function isToday(validDate) {
    let now = new Date();
    let dateArray = validDate.split("-");

    return (
      Number(dateArray[0]) >= now.getFullYear() &&
      Number(dateArray[1]) >= now.getMonth() + 1 &&
      Number(dateArray[2]) >= now.getDate()
    );
  }
  const [totalCost, setTotalCost] = useState(0);

  const formik = useFormik({
    initialValues: {
      userName: user.name,
      email: user.email,
      phone: 0,
      adress: "",
      date: `${year}-${month >= 10 ? month : `0${month}`}-${
        day >= 10 ? day : `0${day}`
      }`,
      cost: totalCost,
    },
    validationSchema: Yup.object({
      adress: Yup.string().label("253 N. Cherry St.").required(),
      phone: Yup.number().test(
        "phone-number",
        "Phone number must include digits only and must be 15 digits minimum",
        function (phone) {
          return /^[0-9]{15,}$/g.test(phone);
        }
      ),
      date: Yup.string().test(
        "date-is-valide",
        "Enter a valid date",
        function (date) {
          return isToday(date);
        }
      ),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form className="w-75 mx-auto my-2 p-4" onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>User name</Form.Label>
        <Form.Control
          type="text"
          disabled
          value={formik.values.userName}
          name="userName"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          placeholder="Ex.+00123456789012"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone && (
          <div className="text-danger fs-5 text-start">
            {formik.errors.phone}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          disabled
          value={formik.values.email}
          name="email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        {formik.errors.date && (
          <div className="text-danger fs-5 text-start">
            {formik.errors.date}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="adress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="adress"
          placeholder="Your adress, ex. 253 N. Cherry St."
          onChange={formik.handleChange}
          value={formik.values.adress}
        />
        {formik.errors.adress && (
          <div className="text-danger fs-5 text-start">
            {formik.errors.adress}
          </div>
        )}
      </Form.Group>
      <p className="fs-4 ">Products</p>
      <TotalCostContext.Provider value={[setTotalCost]}>
        <Cart />
      </TotalCostContext.Provider>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormComponent;
