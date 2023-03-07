import { useFormik } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";

function PiecesField({ initialQuantity }) {
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
        onChange={formik.handleChange}
      />
      {formik.errors.pieces && (
        <p className="text-danger fs-5 text-start">{formik.errors.pieces}</p>
      )}
    </Form.Group>
  );
}

export default PiecesField;
