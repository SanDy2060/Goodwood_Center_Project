import React from "react";
import "../styles/membershipDonation.css";

const MembershipDonation = () => {
    const stripeDonationLink = "https://buy.stripe.com/test_14k6s1fkL0Dzcj67ss"; 

    const handleDonation = () => {
        window.location.href = stripeDonationLink;
    };

    return (
        <div className="donation-container">
            {/* Heading */}
            <div className="donation-header">
                Support Us
            </div>

            {/* Content Section */}
            <div className="donation-content">
                {/* Left Side: Membership Box */}
                <div className="membership-box">
                    <h2>Become a Member</h2>
                    <p>Stay connected with us to receive updates, events, and exclusive offers.</p>
                    <button className="member-button">Become a Member</button>
                </div>

                {/* Right Side: Image */}
                <div className="donation-image">
                    <img src="donation.png" alt="Support Goodwood Community Center" />
                </div>
            </div>

            {/* Additional Donation Info Section */}
            <div className="donation-extra">
                {/* Left: Image */}
                <div className="donation-extra-image">
                    <img src="group.png" alt="Community Events" />
                </div>

                {/* Right: Text Content */}
                <div className="donation-extra-text">
                    <h2>Exciting Events</h2>
                    <p>
                        Join us for engaging activities and support our community programs. Your contributions enable us to enhance our events and services. Together, we can create a positive impact on our community.
                    </p>

                    {/* Donation Section */}
                    <h3>Make a Donation</h3>
                    <button id="donateBtn" onClick={handleDonation}>
                        Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MembershipDonation;
