function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.name === "") {
    error.name = "Name field is required";
  } else {
    error.name = "";
  }

  if (values.email === "") {
    error.email = "Email field is required";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Invalid Email format";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password field is required";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Invalid password format";
  } else {
    error.password = "";
  }
  return error;
}
export default Validation;
