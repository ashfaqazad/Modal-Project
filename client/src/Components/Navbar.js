import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

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
                                <button 
                                    className="btn bg-white text-success mx-1" 
                                    onClick={() => setShowLoginModal(true)}>Login
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className="btn bg-white text-success mx-1" 
                                    onClick={() => setShowSignupModal(true)}>Signup
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Show Login Modal */}
            {showLoginModal && 
                <Login onClose={() => setShowLoginModal(false)} />
            }

            {/* Show Signup Modal */}
            {showSignupModal && 
                <Signup onClose={() => setShowSignupModal(false)} />
            }
        </>
    );
};

export default Navbar;
