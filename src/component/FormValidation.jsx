import React, { useState } from 'react';
import './FormValidation.css';
function FormValidation() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '', confirm: '', name: '', phone: '' });
  const [agree, setAgree] = useState(false)
  const phonePattern = /^[6-9]\d{9}$/;
  const namePattern = /^[A-Za-z]{3,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("FormValidation component loaded")
  const validateName = (input) => {
    if (!input) return "Name Filed is Empty"
    return namePattern.test(input) ? "" : "Invalid Name Format"
  }
  const validatePhone = (input) => {
    if (!input) return "Phone Filed Is Empty"
    return phonePattern.test(input) ? "" : "Invalid Phone Format"
  }
  const validateEmail = (input) => {
    if (!input) return "Email Field Is Empty";
    return emailPattern.test(input) ? "" : "Invalid Email Format";
  };

  const validatePassword = (input) => {
    if (!input) return "Password Field Is Empty";
    const rules = [
      { validate: (pw) => pw.length >= 8, message: "Minimum 8 characters" },
      { validate: (pw) => /[A-Z]/.test(pw), message: "One uppercase letter" },
      { validate: (pw) => /[a-z]/.test(pw), message: "One lowercase letter" },
      { validate: (pw) => /[0-9]/.test(pw), message: "One number" },
      { validate: (pw) => /[!@#$%^&*]/.test(pw), message: "One special character" }
    ];
    const passwordRules = rules.filter((rule) => !rule.validate(input)).map((rule) => rule.message);
    return passwordRules.length > 0 ? passwordRules.join(", ") : "";
  };
  const handleName = (e) => {
    const val = e.target.value;
    setName(val);
    setError(prev => ({ ...prev, name: validateName(val) }));

  }
  const handlePhone = (e) => {
    const val = e.target.value;
    setPhone(val)
    setError(prev => ({ ...prev, phone: validatePhone(val) }))
  }
  const handleEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
    setError(prev => ({ ...prev, email: validateEmail(val) }));
  };

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    setError(prev => ({
      ...prev,
      password: validatePassword(val),
      confirm: confirmPassword && confirmPassword !== val ? "Passwords do not match" : ""
    }));
  };

  const handleConfirm = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    setError(prev => ({
      ...prev,
      confirm: val !== password ? "Passwords do not match" : ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameInfo = validateName(name);
    const phoneInfo = validatePhone(phone);
    const emailInfo = validateEmail(email);
    const passwordInfo = validatePassword(password);
    const confirmInfo = confirmPassword !== password ? "Passwords do not match" : "";

    setError({ email: emailInfo, password: passwordInfo, confirm: confirmInfo, name: nameInfo, phone: phoneInfo });

    if (!emailInfo && !passwordInfo && !confirmInfo && !nameInfo && !phoneInfo) {
      alert("Form submitted!");
    }
  };

  const isDisabled = !email || !password || !confirmPassword || !name || !phone || error.email || error.password.length > 0 || error.confirm || error.name || error.phone || !agree;

  return (
   <form onSubmit={handleSubmit} className="form">
  <h2>User Registration
  </h2>

  <div className="input-group">
    <input
      type="text"
      placeholder="Enter Your Name"
      value={name}
      onChange={handleName}
      className="input"
    />
    {error.name && <div className="error">{error.name}</div>}
  </div>

  <div className="input-group">
    <input
      type="text"
      placeholder="Enter Your Phone Number"
      value={phone}
      onChange={handlePhone}
      className="input"
    />
    {error.phone && <div className="error">{error.phone}</div>}
  </div>

  <div className="input-group">
    <input
      type="email"
      placeholder="Enter Your Email"
      value={email}
      onChange={handleEmail}
      className="input"
    />
    {error.email && <div className="error">{error.email}</div>}
  </div>

  <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter Your Password"
      value={password}
      onChange={handlePassword}
      className="input"
    />
    {error.password && <div className="error">{error.password}</div>}
  </div>
  <div className="checkbox-group">
    <label>
      <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
      {" "} {showPassword ? "Hide Password" : "Show Password"}
    </label>
  </div>

  <div className="input-group">
    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={handleConfirm}
      className="input"
    />
    {error.confirm && <div className="error">{error.confirm}</div>}
  </div>
  <div className="checkbox-group">
    <label>
      <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
      {" "} I Agree to the terms and conditions
    </label>
  </div>

  <button type="submit" className="submit-btn" disabled={isDisabled}>
    Submit
  </button>
</form>

  );
}
//FORMIK AND YUP

// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// function FormValidation() {
//   const [showPassword, setShowPassword] = useState(false);

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .matches(/^[A-Za-z]{3,}$/, "Invalid Name Format")
//       .required("Name Field is Empty"),
//     phone: Yup.string()
//       .matches(/^[6-9]\d{9}$/, "Invalid Phone Format")
//       .required("Phone Field Is Empty"),
//     email: Yup.string()
//       .email("Invalid Email Format")
//       .required("Email Field Is Empty"),
//     password: Yup.string()
//       .required("Password Field Is Empty")
//       .min(8, "Minimum 8 characters")
//       .matches(/[A-Z]/, "One uppercase letter")
//       .matches(/[a-z]/, "One lowercase letter")
//       .matches(/[0-9]/, "One number")
//       .matches(/[!@#$%^&*]/, "One special character"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords do not match")
//       .required("Confirm Password is required"),
//     agree: Yup.boolean().oneOf([true], "You must accept the terms"),
//   });

//   const initialValues = {
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     agree: false,
//   };

//   const handleSubmit = (values, { resetForm }) => {
//     alert("Form submitted!");
//     resetForm();
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isValid, dirty }) => (
//         <Form>
//           <div>
//             <Field type="text" name="name" placeholder="Enter Your Name" />
//             <ErrorMessage name="name" component="div" style={{ color: "red" }} />
//           </div>

//           <div>
//             <Field type="text" name="phone" placeholder="Enter Your Phone Number" />
//             <ErrorMessage name="phone" component="div" style={{ color: "red" }} />
//           </div>

//           <div>
//             <Field type="email" name="email" placeholder="Enter Your Email" />
//             <ErrorMessage name="email" component="div" style={{ color: "red" }} />
//           </div>

//           <div>
//             <Field
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Enter Your Password"
//             />
//             <ErrorMessage name="password" component="div" style={{ color: "red" }} />
//           </div>

//           <div>
//             <Field
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//             />
//             <ErrorMessage name="confirmPassword" component="div" style={{ color: "red" }} />
//           </div>

//           <label>
//             <input
//               type="checkbox"
//               onChange={() => setShowPassword(!showPassword)}
//             />
//             {showPassword ? "Hide Password" : "Show Password"}
//           </label>

//           <div>
//             <label>
//               <Field type="checkbox" name="agree" />
//               I Agree the terms and conditions
//             </label>
//             <ErrorMessage name="agree" component="div" style={{ color: "red" }} />
//           </div>

//           <button type="submit" disabled={!(isValid && dirty)}>Submit</button>
//         </Form>
//       )}
//     </Formik>
//   );
// }

// export default FormValidation;

//REACT-HOOK-FORM WITH YUP

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

// // Validation schema using Yup
// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .matches(/^[A-Za-z]{3,}$/, 'Invalid Name Format')
//     .required('Name Field is Empty'),
//   phone: Yup.string()
//     .matches(/^[6-9]\d{9}$/, 'Invalid Phone Format')
//     .required('Phone Field is Empty'),
//   email: Yup.string()
//     .email('Invalid Email Format')
//     .required('Email Field is Empty'),
//   password: Yup.string()
//     .required('Password Field is Empty')
//     .min(8, 'Minimum 8 characters')
//     .matches(/[A-Z]/, 'One uppercase letter')
//     .matches(/[a-z]/, 'One lowercase letter')
//     .matches(/[0-9]/, 'One number')
//     .matches(/[!@#$%^&*]/, 'One special character'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords do not match')
//     .required('Confirm Password is required'),
//   agree: Yup.bool().oneOf([true], 'You must accept the terms')
// });

// function FormValidationHookForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       name: '',
//       phone: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       agree: false
//     }
//   });

//   const onSubmit = (data) => {
//     console.log('Form Data:', data);
//     alert('Form submitted!');
//     reset(); // Clear the form
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="form">
//       <h2 className="form-heading">User Registration</h2>

//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="Enter Your Name"
//           {...register('name')}
//           className="input"
//         />
//         {errors.name && <div className="error">{errors.name.message}</div>}
//       </div>

//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="Enter Your Phone Number"
//           {...register('phone')}
//           className="input"
//         />
//         {errors.phone && <div className="error">{errors.phone.message}</div>}
//       </div>

//       <div className="input-group">
//         <input
//           type="email"
//           placeholder="Enter Your Email"
//           {...register('email')}
//           className="input"
//         />
//         {errors.email && <div className="error">{errors.email.message}</div>}
//       </div>

//       <div className="input-group">
//         <input
//           type={showPassword ? 'text' : 'password'}
//           placeholder="Enter Your Password"
//           {...register('password')}
//           className="input"
//         />
//         {errors.password && <div className="error">{errors.password.message}</div>}
//       </div>

//       <div className="checkbox-group">
//         <label>
//           <input
//             type="checkbox"
//             onChange={() => setShowPassword(!showPassword)}
//           />
//           {showPassword ? 'Hide Password' : 'Show Password'}
//         </label>
//       </div>

//       <div className="input-group">
//         <input
//           type={showConfirmPassword ? 'text' : 'password'}
//           placeholder="Confirm Password"
//           {...register('confirmPassword')}
//           className="input"
//         />
//         {errors.confirmPassword && (
//           <div className="error">{errors.confirmPassword.message}</div>
//         )}
//       </div>

//       <div className="checkbox-group">
//         <label>
//           <input
//             type="checkbox"
//             onChange={() => setShowConfirmPassword(!showConfirmPassword)}
//           />
//           {showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
//         </label>
//       </div>

//       <div className="checkbox-group">
//         <label>
//           <input type="checkbox" {...register('agree')} />
//           I Agree to the terms and conditions
//         </label>
//         {errors.agree && <div className="error">{errors.agree.message}</div>}
//       </div>

//       <button type="submit" className="submit-btn">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default FormValidationHookForm;

export default FormValidation;
