import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
    const [modalMessage, setModalMessage] = useState('');

    // Handle login change
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle signup change
    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle login submit
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        axios.post('http://localhost:5000/auth/login', { email, password })
            .then(response => {
                console.log(response.data);
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    navigate('/');
                    setShowLoginModal(false);
                }
            })
            .catch(error => {
                console.log(error);
                setModalMessage('Login failed. Please check your credentials.');
            });
    };

    // Handle signup submit
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = signupData;

        axios.post('http://localhost:5000/auth/signup', { username, email, password })
            .then(response => {
                console.log(response.data);
                if (response.data.status) {
                    navigate('/login');
                    setShowSignupModal(false);
                }
            })
            .catch(error => {
                console.log(error);
                setModalMessage('Signup failed. Please try again.');
            });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">AzadDev</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn bg-white text-success mx-1" onClick={() => setShowLoginModal(true)}>Login</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn bg-white text-success mx-1" onClick={() => setShowSignupModal(true)}>Signup</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login</h5>
                                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleLoginSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailInput"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={loginData.email}
                                            onChange={handleLoginChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="passwordInput"
                                            name="password"
                                            placeholder="password"
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                            required
                                        />
                                    </div>
                                    <button className='btn btn-primary' type='submit'>Submit</button>
                                    {modalMessage && <div className="text-danger mt-3">{modalMessage}</div>}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sign Up</h5>
                                <button type="button" className="btn-close" onClick={() => setShowSignupModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSignupSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="usernameInput" className="form-label">User Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="usernameInput"
                                            name="username"
                                            placeholder="Enter your username"
                                            value={signupData.username}
                                            onChange={handleSignupChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="signupEmailInput" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="signupEmailInput"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={signupData.email}
                                            onChange={handleSignupChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="signupPasswordInput" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="signupPasswordInput"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={signupData.password}
                                            onChange={handleSignupChange}
                                            required
                                        />
                                    </div>
                                    <button className='btn btn-primary' type='submit'>Sign Up</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowSignupModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
