// CookieBar.tsx
import React, { useState } from "react";
import Cookies from "js-cookie";

interface CookieBarProps {
  onClose: () => void;
}

const CookieBar: React.FC<CookieBarProps> = ({ onClose }) => {
  const [isCookieSet, setCookie] = useState<boolean>(!!Cookies.get("cookieConsent"));

  // Function to handle accepting cookies
    const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "true");
    setCookie(true);
    onClose(); // Close the toast
  };

  // Function to handle rejecting cookies
  const handleRejectCookies = () => {
    Cookies.remove("cookieConsent");
    setCookie(false);
    onClose(); // Close the toast
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <p>This website uses cookies to improve your experience. Do you accept cookies?</p>
      <div className="flex space-x-2">
        <button onClick={handleAcceptCookies} className="px-4 py-2 bg-blue-500 text-white rounded">
          Accept
        </button>
        <button onClick={handleRejectCookies} className="px-4 py-2 bg-red-500 text-white rounded">
          Reject
        </button>
      </div>
      <sub>Cookie set: {isCookieSet ? <b>Yes</b> : <b>No</b>}</sub>
    </div>
  );
};

export default CookieBar;
