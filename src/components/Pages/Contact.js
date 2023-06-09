import React, { useState } from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from "../Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		nameError: false,
		contact: "",
		email: "",
		emailError: false,
		emailError2: false,
		message: "",
		messageError: false,
		formValid: false,
	});

	const isValidEmail = (email) => {
		return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
	};

	const handleBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));

		if (value.length <= 0 && name === "name") {
			setFormData((prevFormData) => ({
				...prevFormData,
				nameError: true,
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				nameError: false,
			}));
		}

		if (value.length <= 0 && name === "email") {
			setFormData((prevFormData) => ({
				...prevFormData,
				emailError: true,
				emailError2: false,
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				emailError: false,
			}));
			if (isValidEmail(value)) {
				setFormData((prevFormData) => ({
					...prevFormData,
					emailError2: false,
				}));
			} else {
				setFormData((prevFormData) => ({
					...prevFormData,
					emailError2: true,
				}));
			}
		}
	};

	const handleChange = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const {
			name,
			email,
			message,
			nameError,
			emailError,
			emailError2,
			messageError,
		} = formData;

		setFormData((prevFormData) => ({
			...prevFormData,
			nameError: name ? false : true,
			messageError: message ? false : true,
			emailError: email ? false : true,
		}));

		if (email && !emailError) {
			setFormData((prevFormData) => ({
				...prevFormData,
				emailError2: isValidEmail(email) ? false : true,
			}));
		}

		if (
			name &&
			email &&
			message &&
			!nameError &&
			!emailError &&
			!emailError2 &&
			!messageError
		) {
			setFormData((prevFormData) => ({
				...prevFormData,
				formValid: true,
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				formValid: false,
			}));
		}
	};

	const {
		name,
		email,
		message,
		nameError,
		emailError,
		emailError2,
		messageError,
		formValid,
	} = formData;

	if (!formValid) {
		return (
			<>
				<HeaderBar />
				<div className="page-intro">
					<h2>Parsons Floor</h2>
				</div>
				<div className="page-intro-container">
					<div className="page-intro-content">
						<p>
							Are you ready to begin? Do you have any inquiries? Our team is
							here to assist you! Simply give us a call or reach out by
							completing the form. Let us know how we can assist you in
							enhancing your home with top-notch products and expert
							installation or repair services. Get in touch with us today and
							embark on your home transformation journey!
						</p>
						<div className="address">
							<h3>Location</h3>
							<h6>665 Commercial Ave, Garden City, NY 11530</h6>
							<h6>(516) 484-2323</h6>

							<h3>Hours</h3>
							<h6>Monday: 10AM–4PM</h6>
							<h6>Tuesday: 10AM–4PM</h6>
							<h6>Wednesday: 10AM–4PM</h6>
							<h6>Thursday: 10AM–4PM</h6>
							<h6>Friday: 10AM–4PM</h6>
							<h6>Saturday: 10AM–4PM</h6>
							<h6>Sunday: 12–5PM</h6>
						</div>
					</div>
					<div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
						<div className="card-header bg-transparent border-0 text-center text-uppercase">
							<h3>Send us a message</h3>
						</div>
						<div className="card-body">
							<form
								action="/"
								onSubmit={handleSubmit}
								encType="multipart/form-data"
								autoComplete="off"
							>
								<div className="form-group">
									<label className="mb-0">
										Your name<span className="text-danger">*</span>
									</label>
									<input
										name="name"
										type="text"
										className="form-control"
										placeholder="Name"
										value={name}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{nameError && (
										<div className="alert alert-danger mt-2">
											Name is a required field.
										</div>
									)}
								</div>
								<div className="form-group">
									<label className="mb-0">
										Your email<span className="text-danger">*</span>
									</label>
									<input
										name="email"
										type="email"
										className="form-control"
										placeholder="Email"
										value={email}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{emailError && (
										<div className="alert alert-danger mt-2">
											Email is a required field.
										</div>
									)}
									{emailError2 && (
										<div className="alert alert-danger mt-2">
											Email invalid.
										</div>
									)}
								</div>
								<div className="form-group">
									<label className="mb-0">Your contact number (Optional)</label>
									<input
										name="contact"
										type="text"
										className="form-control"
										placeholder="Contact"
										onChange={handleChange}
										value={formData.contact}
									/>
								</div>
								<div className="form-group">
									<label className="mb-0">Subject (Optional)</label>
									<input
										name="subject"
										type="text"
										className="form-control"
										placeholder="Subject"
										onChange={handleChange}
										value={formData.contact}
									/>
								</div>
								<div className="form-group">
									<label className="mb-0">
										Message<span className="text-danger">*</span>
									</label>
									<textarea
										name="message"
										type="text"
										className="form-control"
										placeholder="Message"
										value={message}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									{messageError && (
										<div className="alert alert-danger mt-2">
											Message is a required field.
										</div>
									)}
								</div>
								<p className="text-center mb-0">
									<input
										type="submit"
										className="btn btn-primary btn-lg w-100 text-uppercase"
										value="Submit Now"
									/>
								</p>
							</form>
						</div>
					</div>
				</div><Footer />
			</>
		);
	} else {
		return (
			<div className="thankyou_details">
				<div className="alert alert-success mt-3">Mail sent successfully.</div>
				
			</div>
		);
	}
}
