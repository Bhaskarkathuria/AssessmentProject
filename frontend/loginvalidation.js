function Validation (values){
    let error={}
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        error.email="Email field is required"
    }else if(!email_pattern.test(values.email)){
        error.email="Invalid Email format"
    }else{
        error.email =""
    }

    if (values.password === "") {
      error.password = "Email field is required";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Invalid Password format!";
    } else {
      error.password = "";
    }
    return error

}
export default Validation;