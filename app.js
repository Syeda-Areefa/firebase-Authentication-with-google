import { 
  auth, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  sendEmailVerification,
  signOut,
  signInWithPopup, 
  GoogleAuthProvider,
  provider,
  signInWithEmailAndPassword
} from "./firebase.js";
// Get the global loader element
const loader = document.getElementById('global-loader');

// Function to show the loader
function showLoader() {
  loader.classList.add('visible');
}

// Function to hide the loader
function hideLoader() {
  loader.classList.remove('visible');
}

// Sign Up Function
let signUp = () => {
  showLoader();
  console.log('signUpWorkings');  // Check if function is triggered
  
  // Get input values
  let email = document.getElementById("email").value;
  let password = document.getElementById("Password").value;
  let cPassword = document.getElementById("confirm_pass").value;

  // Email regex (updated for better validation)
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password regex (updated for better validation)
  let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // Debugging the input values
  console.log(`Email: '${email}'`);
  console.log(`Password: '${password}'`);
  console.log(`Confirm Password: '${cPassword}'`);

  // Validate email and password using regex
  if (emailRegex.test(email)) {
    console.log("Email is valid");
  } else {
    console.log("Email is invalid");
    alert("Please enter a valid email address");
    hideLoader(); 
    return; // Exit the function if the email is invalid
  }

  if (passwordRegex.test(password)) {
    console.log("Password is valid");
  } else {
    console.log("Password is invalid");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password must contain at least one digit, one special character, and be between 6-16 characters",
    });
    hideLoader(); 
    return; // Exit the function if the password is invalid
  }

  // Check if password and confirm password match
  if (password !== cPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Passwords should be identical",
    });
    hideLoader(); 
    return; // Exit the function if passwords don't match
  }

  // If all validations pass, proceed to create the user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    alert("Account created successfully");
    window.location.href = "./index.html";  // Redirect after successful sign-up
    hideLoader(); 
  })
  .catch((error) => {
    console.log(error.message);
    alert(error.code);  // Display the error code to the user
    hideLoader(); 

  });

};

// Check the current page path and attach the event listener
if (window.location.pathname === "/index.html") {
  let sign_up = document.getElementById("sign_up");
  sign_up.addEventListener("click", signUp);
}

// Sign In Function (Login)
let signIn = () => {
  console.log('signInWorkings');  // Check if function is triggered
  let email = document.getElementById("email").value;
  let password = document.getElementById("Password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "/dashboard.html";
    })
    .catch((error) => {
      alert(error.code);
    });
};

// Handle Login Page (for login form)
if (window.location.pathname === "/login.html") {
  let sign_in = document.getElementById("sign_in");
  sign_in.addEventListener("click", signIn);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    // window.location.href = "./dashboard.html"
  } else {
  console.log("User not found")
  }
});

//email verification
let sendMail = ()=>{
sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log( "Email verification sent!"); 
  });
}

let verify= document.getElementById("verifiedBtn");
verify.addEventListener("click", sendMail)

// Google Sign-up
let googleSignup = () => {
  console.log('Google SignUp is working');
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      // Redirect to another page after success (if needed)
    })
    .catch((error) => {
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
    });
}

// Check if on the signup page and add event listener to Google button
if (window.location.pathname === "/index.html") {
  let googleBtn = document.getElementById("googleBtn");
  googleBtn.addEventListener("click", googleSignup);
}


let signOutUser = () => {
  showLoader()
  signOut(auth)
    .then(() => {
      // Sign-out successful
      console.log("User signed out successfully");
      alert("You have logged out successfully!");
      
      // Redirect the user to the login page (or any page you prefer)
      window.location.href = "./login.html";  // Adjust the URL as needed
    })
    .catch((error) => {
      // Handle sign-out errors
      console.error("Error signing out: ", error);
    });
    hideLoader(); 
};

// Example: Add event listener to a "Sign Out" button
let signOutButton = document.getElementById("signOutButton");
if (signOutButton) {
  signOutButton.addEventListener("click", signOutUser);
}
