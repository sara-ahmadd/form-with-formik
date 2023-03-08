import { useFormik } from "formik";
import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { CartContext } from "../App";

function PiecesField({ initialQuantity, getSalesAmount, xId }) {
  const cart = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      pieces: initialQuantity,
    },
    validationSchema: Yup.object({
      pieces: Yup.number().min(1, "Enter a valid quantity."),
    }),
  });
  return (
    <Form.Group onSubmit={formik.handleSubmit} controlId="pieces">
      <Form.Label>Pieces</Form.Label>
      <Form.Control
        type="number"
        name="pieces"
        value={formik.values.pieces}
        onChange={(e) => {
          formik.handleChange(e);
          getSalesAmount({ value: formik.values.pieces, id: xId })
        }}
      />
      {formik.errors.pieces && (
        <p className="text-danger fs-5 text-start">{formik.errors.pieces}</p>
      )}
    </Form.Group>
  );
}

export default PiecesField;
