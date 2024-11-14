import { auth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,signOut,signInWithPopup, GoogleAuthProvider,provider } from "./firebase.js";



let signUp = ()=> {
    let email = document.getElementById("email").value
    let password= document.getElementById("Password").value
    let cPassword = document.getElementById("confirm_pass").value;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      
      
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Account created successfully");
      window.location.href = "./index.html"
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.code);
    });
  } else {
    alert("Invalid email or Password");
  }
  if (password !== cPassword) {
    alert("Passwords should be identical");
  }
};
if(window.location.pathname=="/"){
  let sign_up = document.getElementById("sign_up");
  sign_up.addEventListener("click",signUp);
};

  let signIn =()=>{
    let email= document.getElementById("email").value
    let password = document.getElementById("Password").value

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
       alert("Login Successful")
       window.location.href = "./Post app/index.html"
      })
      .catch((error) => {
        alert(error.code)
      });
  };
  if(window.location.pathname=="//login.html"){
    let sign_in = document.getElementById("sign_in");
    sign_in.addEventListener("click",signIn);
  };

  // onAuthStateChanged(auth, (user) => {
  //   if (user && window.location.pathname != '/dashboard.html') {
  //     console.log('window.location.pathname-->', window.location.pathname)
  //     window.location.replace("./dashboard.html");
  
  //   } else {
  //     let profileemail = document.getElementById('profile-email')
  //     profileemail.innerHTML = user.email
  //     console.log('user-->email ', user.emailVerified)
  //     let profileemailverified = document.getElementById('profile-email-verified')
  //     profileemailverified.innerHTML = user.emailVerified
  
  //   }
  // })

//   let verifiedBtn = document.getElementById("verifiedBtn");
//   verifiedBtn.addEventListener("click", () => {
//   sendEmailVerification(auth.currentUser)
//     .then(() => {
//       console.log("verified")
//       console.log('user-->email ', user.emailVerified)

//     });

// }) 

  let googleSignup=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
     
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
     console.log(user);
    //  window.location.href = "./class27/index.html"

    }).catch((error) => {
      
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
    });
}
if(window.location.pathname=="/"){
    let googleBtn = document.getElementById("googleBtn");
    googleBtn.addEventListener("click", googleSignup);
}

// let signout = document.getElementById('signout')
// signout && signout.addEventListener('click', () => {
//   console.log('signout-->', signout)
//   signOut(auth).then(() => {
//     // Sign-out successful.
//     console.log('signout')
//     window.location.replace("./index.html");

//   })
//     .catch((error) => {
//       // An error happened.
//       // console.log(error)
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: error,
//         footer: '<a href="">Why do I have this issue?</a>'
//       })

//     });

// })

  

  