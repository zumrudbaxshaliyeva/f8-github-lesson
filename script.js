const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (validateInputs()) {
        form.reset();
        clearSuccessClasses();
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let isValid = true;

    if (usernameValue === "") {
        setError(username, "Username is required");
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === "") {
        setError(email, "Email is required");
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a valid email address");
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === "") {
        setError(password, "Password is required");
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, "Password must be at least 8 characters");
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (password2Value === "") {
        setError(password2, "Please confirm your password");
        isValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords do not match");
        isValid = false;
    } else {
        setSuccess(password2);
    }

    return isValid;
};

const isValidEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

const clearSuccessClasses = () => {
    const inputControls = document.querySelectorAll(".input-control");
    inputControls.forEach(inputControl => {
        inputControl.classList.remove("success");
    });
};
