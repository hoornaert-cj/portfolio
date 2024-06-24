// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { restBase } from '../utilities/Utilities';

const Footer = () => {
  const restPath = `${restBase}pages/9?acf_format=standard`;
  const [footerData, setFooterData] = useState({
    copyright: '',
    socialMedia: []
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(restPath);
        const data = await response.json();
        setFooterData({
          copyright: data.acf.copyright_text || 'Chris Hoornaert',
          socialMedia: data.acf.footer_social_media || []
        });
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="copyright">
      {footerData.copyright} &copy; {currentYear} | Created by
        <a href="https://chrishoornaert.com/" target="_blank" rel="noopener noreferrer"> Chris Hoornaert</a>
      </p>
      <div className="social-links">
        {footerData.socialMedia.map((media, index) => (
          <a key={index} href={media.footer_url} target="_blank" rel="noopener noreferrer">
            <img src={media.footer_icon.url} alt={media.footer_icon.alt} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
