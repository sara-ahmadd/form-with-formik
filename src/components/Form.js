import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";

function FormComponent() {
  let product = {
    name: "T-shirt",
    price: 122,
    tax: 10,
    pieces: 1,
  };
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

  /**
*\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.
*This allows 1-5 digits for the house number, a space, 
a character followed by a period (for N. or S.), 
1-4 words for the street name, 
finished with an abbreviation (like st. or rd.). 
 */
  let validAdress = /\d{1,5}\s\w.\s?(\b\w*\b\s){1,4}\w*\./gi;

  const validate = (values) => {
    let errors = {};
    if (!values.adress) {
      errors.adress = "Adress is required.";
    } else if (!validAdress.test(values.adress)) {
      errors.adress = "Follow the example :  253 N. Cherry St.";
    }
    if (!values.pieces) {
      errors.pieces = "Number of pieces is required.";
    } else if (values.pieces <= 0) {
      errors.pieces = "Number must be greater than 0.";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^[0-9]{15,}$/g.test(values.phone)) {
      errors.phone =
        "Phone number must include digits only and must be 15 digits minimum";
    }

    if (!isToday(values.date)) {
      errors.date = "Enter a valide date.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      userName: user.name,
      email: user.email,
      phone: "",
      product: product.name,
      pieces: 1,
      price: product.price,
      tax: product.tax,
      salesAmount: product.price * product.pieces,
      totalAfterTax: (product.tax / 100) * product.price + product.price,
      adress: "",
      date: `${year}-${month >= 10 ? month : `0${month}`}-${
        day >= 10 ? day : `0${day}`
      }`,
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form className="w-50 mx-auto my-2 p-4" onSubmit={formik.handleSubmit}>
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
        {formik.errors.phone ? (
          <div className="text-danger fs-5 text-start">
            {formik.errors.phone}
          </div>
        ) : null}
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
        {formik.errors.date ? (
          <div className="text-danger fs-5 text-start">
            {formik.errors.date}
          </div>
        ) : null}
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
        {formik.errors.adress ? (
          <div className="text-danger fs-5 text-start">
            {formik.errors.adress}
          </div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="product">
        <Form.Label>Product</Form.Label>
        <Form.Control
          type="text"
          value={formik.values.product}
          disabled
          name="product"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="pieces">
        <Form.Label>Pieces</Form.Label>
        <Form.Control
          type="number"
          name="pieces"
          placeholder="ex. 3"
          onChange={formik.handleChange}
          value={formik.values.pieces}
        />
        {formik.errors.pieces ? (
          <div className="text-danger fs-5 text-start">
            {formik.errors.pieces}
          </div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" value={`${formik.values.price} $`} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="salesAmount">
        <Form.Label>Sales amount</Form.Label>
        <Form.Control
          type="text"
          value={`${formik.values.salesAmount} $`}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="tax">
        <Form.Label>Tax</Form.Label>
        <Form.Control type="text" value={formik.values.tax} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="totalAfterTax">
        <Form.Label>Total After Tax</Form.Label>
        <Form.Control
          type="text"
          name="totalAfterTax"
          value={formik.values.totalAfterTax}
          disabled
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default FormComponent;
