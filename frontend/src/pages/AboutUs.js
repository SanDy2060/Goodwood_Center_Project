import React from "react";
import '../styles/aboutUs.css';


const AboutUs = () => {
  return (
    <div className="container">
      <div className="header">Our Community Center Vision</div>

      {/* Vision Section */}
      <div className="content" id="vision">
        <div className="image-container">
          <img src="photo.avif" alt="Community Center" />
        </div>
        <div className="text-container">
          <h2>Connecting Community Through Diversity</h2>
          <p>
            At our community center, we envision a vibrant and inclusive space where individuals of all ages can come together to learn, grow, and connect.
            Our mission is to foster a sense of belonging by offering diverse programs and activities that cater to the and interests of our community.
            We aim to empower residents through collaboration, creativity, and support, creating a brighter future for everyone. Join us in building a strong, united community!
          </p>
        </div>
      </div>

      {/* Mission Section */}
      {/* Mission Section */}
        <div class="mission-section" id="mission">
          <div class="mission-content">
            <h2 class="mission-title">Community's Mission</h2>
            <p class="mission-text">
              At Goodwood Community Center, our mission is to empower individuals and families through a wide range of programs and services.
              Join us in building a stronger, more connected neighborhood where everyone has the opportunity to reach their full potential.
            </p>
          </div>
          <div class="mission-images">
            <img src="photo.avif" alt="Community Mission 1" />
            <img src="photo.avif" alt="Community Mission 2" />
          </div>
        </div>



      {/* History Section */}
      <div className="history-section" id="history">
        <h1 className="history-title">Our Community Center History</h1>
        <div className="image-grid">
          <img src="photo.avif" alt="Community History" />
          <img src="photo.avif" alt="Seminar"/>
          <img src="photo.avif" alt="Seminar"/>
          <img src="photo.avif" alt="Seminar"/>
          <img src="photo.avif" alt="Seminar"/>
          <img src="photo.avif" alt="Seminar"/>
          
        </div>
      </div>

      {/* Empowering Community Section */}
      <div className="empower-section" id="empower">
        <div className="empower-content">
          <div className="empower-text">
            <h2>Empowering Our Community Together</h2>
            <p>
              Goodwood Community Center has been a cornerstone of our neighborhood for decades, providing a safe haven and a hub for social activities.
              From hosting educational workshops to organizing fun events for all ages, we strive to create a welcoming environment where everyone feels at home.
              Our center is a place where friendships are formed, talents are nurtured, and memories are made.
            </p>
          </div>
          <div className="empower-image">
            <img src="photo.avif" alt="Community gathering at Goodwood Community Center" />
          </div>
        </div>
      </div>


      {/* Teams Section */}
      <div className="teams-section" id="teams">
        <h1 className="teams-title">Teams</h1>

        <div className="team-member">
          <div className="team-text">
            <h2>Sarah Johnson - <span>Program Coordinator</span></h2>
            <p>Sarah brings a wealth of experience in organizing community events and managing programs that cater to all age groups. Her passion for community engagement and creativity drives the success of our center's initiatives.</p>
          </div>
          <div className="team-image">
            <img src="photo.avif" alt="Sarah Johnson" />
          </div>
        </div>

        <div className="team-member">
          <div className="team-text">
            <h2>David Lee - <span>Cultural Programs Director</span></h2>
            <p>David is dedicated to curating diverse and engaging cultural programs that celebrate the richness of our community. His innovative ideas and artistic vision bring a unique flair to our center's offerings.</p>
          </div>
          <div className="team-image">
            <img src="photo.avif" alt="David Lee" />
          </div>
        </div>

        <div className="team-member">
          <div className="team-text">
            <h2>Aisha Patel - <span>Recreation Manager</span></h2>
            <p>Aisha oversees our recreational and fitness services, ensuring that our members have access to top-notch facilities and programs. Her commitment to health and well-being inspires our community to lead active and fulfilling lives.</p>
          </div>
          <div className="team-image">
            <img src="photo.avif" alt="Aisha Patel" />
          </div>
        </div>
      </div>

  
      <div className="voices-section" id="voices">
  <div className="voices-text">
    <h1>Community Voices</h1>
    <p>
      The Goodwood Community Center has truly transformed the way we connect and engage with our neighbors.
      It's a place where people from all walks of life come together to learn, grow, and thrive.
      Being part of this community has been a life-changing experience for me.
    </p>
  </div>

  <div className="facebook-reviews-grid">
    <div className="review-card">
      <iframe
        title="Community Voices Facebook Post"
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdianne.reynolds.562%2Fposts%2Fpfbid021VjWYFAqR97bF3xNrRty5yatnZSrAoFpXkW8TcHtisJjEZsm7pkd6StvyrBMwSKtl&show_text=true&width=500"
        width="100%"
        height="200"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>

    <div className="review-card">
      <iframe
        title="Facebook Post 2"
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0zcWn1CCY1fR5GEo3UP6rB27EbeSsoqgxdC1qh3hwFNJeZFU8qA8WwJhQ6CAFxkAfl%26id%3D61566541233937&show_text=true&width=500"
        width="100%"
        height="200"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>

    <div className="review-card">
      <iframe
        title="Facebook Post 3"
        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FAtzTaberdo%2Fposts%2Fpfbid02hJsYZTHYsCQMxQyS3jXV9k43k4DGhWW2eAwPR79jtzPjgftKBJXrrthhRJG1gq8el&show_text=true&width=500"
        width="100%"
        height="200"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  </div>
</div>


    </div>
  );
};

export default AboutUs;
