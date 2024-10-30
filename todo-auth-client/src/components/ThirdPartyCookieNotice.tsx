import React, { useEffect, useState } from 'react';

const ThirdPartyCookieNotice: React.FC = () => {
  const [isThirdPartyCookieEnabled, setIsThirdPartyCookieEnabled] = useState(true);

  useEffect(() => {
    const checkThirdPartyCookies = () => {
      document.cookie = 'test_cookie=1';
      const cookiesEnabled = document.cookie.includes('test_cookie');
      
      if (!cookiesEnabled) {
        setIsThirdPartyCookieEnabled(false);
      }

      document.cookie = 'test_cookie=; Max-Age=0';
    };

    checkThirdPartyCookies();
  }, []);

  return (
    <>
      {!isThirdPartyCookieEnabled && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-black p-4 text-center z-50">
          <p>
            Third-party cookies are disabled. To use this application, please enable third-party cookies in your browser settings.
          </p>
          <p>
            <span className='font-bold'>Instructions:</span> 
            <ul>
              <li><span className='font-bold'>Chrome:</span> Go to Settings-Privacy and security-Cookies and other site data. Select "Allow all cookies."</li>
              <li><span className='font-bold'>Firefox:</span> Go to Preferences-Privacy & Security-Cookies and Site Data. Uncheck "Block cookies and site data."</li>
              <li><span className='font-bold'>Safari:</span> Go to Preferences-Privacy and uncheck "Prevent cross-site tracking."</li>
            </ul>
          </p>
          <p>This site only uses third-party cookies for authentication tokens and does not track your activity outside this application.</p>
        </div>
      )}
    </>
  );
};

export default ThirdPartyCookieNotice;
