import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { FaApple } from "react-icons/fa";
import img from "../../assets/f1.png";
import imgg from "../../assets/logo.png";

import "./Footer.css";

/** Honest placeholder behaviour for CTAs whose real destination doesn't exist
 *  yet (app stores, social accounts). They give feedback instead of doing
 *  nothing or navigating to a dead "#". */
const notifyComingSoon = (what: string) => () =>
  toast.info(`${what} — coming soon.`, { position: "bottom-right" });

const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      <div className="footerCta">
        <div className="ctaContent">
          <div className="ctaText">
            <h2>Your Health, One Tap Away</h2>
            <p>
              Book appointments, chat with doctors, and manage your health
              anytime—right from your phone. Download the app now and stay
              connected wherever you are.
            </p>
            <div className="ctaButtons">
              <button
                type="button"
                className="storeBtn cursor-pointer"
                onClick={notifyComingSoon("The iOS app is coming soon")}
                aria-label="Download on the Apple Store (coming soon)"
              >
                <FaApple size={28} />
                <div>
                  <span>Download on the</span>
                  <p>Apple Store</p>
                </div>
              </button>
              <button
                type="button"
                className="storeBtn cursor-pointer"
                onClick={notifyComingSoon("The Android app is coming soon")}
                aria-label="Get it on Google Play (coming soon)"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#34A853"
                    d="M325.3 234.3L104.8 13.8c-6.5 6.6-10.5 15.7-10.5 25.8v432.8c0 10.1 4 19.2 10.5 25.8l220.5-220.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M438.2 256L370.4 217l-45.1 39 45.1 39 67.8-39c16.2-9.3 16.2-30.7 0-40z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M104.8 498.2c6.5 6.6 15.6 10.6 25.8 10.6 6.2 0 12.3-1.5 17.8-4.7l222-128.1-45.1-39-220.5 161.2z"
                  />
                  <path
                    fill="#EA4335"
                    d="M148.4 7.9C142.9 4.7 136.8 3.2 130.6 3.2c-10.2 0-19.3 4-25.8 10.6l220.5 220.5 45.1-39L148.4 7.9z"
                  />
                </svg>
                <div>
                  <span>GET IT ON</span>
                  <p>Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="ctaImage">
            <img src={img} alt="App phones" />
          </div>
        </div>
      </div>
      <footer className="footer">
        {/* Main Footer */}
        <div className="footerMain">
          <div className="footerContainer">
            {/* Column 1 */}
            <div className="footerCol footerAbout">
              <div className="footerLogo">
                <img src={imgg} alt="Cure Logo" className="logoImg" />
                <span className="logoText">Cure</span>
              </div>
              <p className="footerDesc">
                Cure helps you find trusted doctors, book appointments, and
                manage your health—quickly and easily.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "18px",
                  marginTop: "28px",
                  flexWrap: "wrap",
                }}
                className="socialIcons"
              >
                <button
                  type="button"
                  className="socialIcon cursor-pointer"
                  aria-label="Facebook (coming soon)"
                  onClick={notifyComingSoon("Social pages are coming soon")}
                >
                  {/* Facebook SVG */}
                  <svg
                    width="42"
                    height="31"
                    viewBox="0 0 11 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0391 11.25H7.10938V20H3.20312V11.25H0V7.65625H3.20312V4.88281C3.20312 1.75781 5.07812 0 7.92969 0C9.29688 0 10.7422 0.273438 10.7422 0.273438V3.35938H9.14062C7.57812 3.35938 7.10938 4.29688 7.10938 5.3125V7.65625H10.5859L10.0391 11.25Z"
                      fill="#145DB8"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="socialIcon cursor-pointer"
                  aria-label="WhatsApp (coming soon)"
                  onClick={notifyComingSoon("Social pages are coming soon")}
                >
                  {/* WhatsApp SVG */}

                  <svg
                    width="42"
                    height="31"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12C2 13.89 2.525 15.66 3.438 17.168L2.546 20.2C2.49478 20.3741 2.49141 20.5587 2.53624 20.7346C2.58107 20.9104 2.67245 21.0709 2.80076 21.1992C2.92907 21.3276 3.08958 21.4189 3.26542 21.4638C3.44125 21.5086 3.62592 21.5052 3.8 21.454L6.832 20.562C8.39074 21.5049 10.1782 22.0023 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM9.738 14.263C11.761 16.285 13.692 16.552 14.374 16.577C15.411 16.615 16.421 15.823 16.814 14.904C16.8632 14.7896 16.881 14.6641 16.8655 14.5405C16.85 14.417 16.8019 14.2998 16.726 14.201C16.178 13.501 15.437 12.998 14.713 12.498C14.5619 12.3932 14.3761 12.3512 14.1946 12.3806C14.0131 12.4101 13.8502 12.5088 13.74 12.656L13.14 13.571C13.1083 13.62 13.0591 13.6551 13.0025 13.6692C12.9459 13.6833 12.886 13.6754 12.835 13.647C12.428 13.414 11.835 13.018 11.409 12.592C10.983 12.166 10.611 11.6 10.402 11.219C10.3767 11.1705 10.3696 11.1145 10.3819 11.0611C10.3941 11.0078 10.425 10.9606 10.469 10.928L11.393 10.242C11.5252 10.1276 11.6106 9.96841 11.6328 9.79495C11.6549 9.62149 11.6123 9.44596 11.513 9.302C11.065 8.646 10.543 7.812 9.786 7.259C9.6881 7.18866 9.57369 7.14479 9.45385 7.13165C9.33402 7.11851 9.21282 7.13654 9.102 7.184C8.182 7.578 7.386 8.588 7.424 9.627C7.449 10.309 7.716 12.24 9.738 14.263Z"
                      fill="#4CAF50"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="socialIcon cursor-pointer"
                  aria-label="YouTube (coming soon)"
                  onClick={notifyComingSoon("Social pages are coming soon")}
                >
                  {/* YouTube SVG */}

                  <svg
                    width="28"
                    height="25"
                    viewBox="0 0 22 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8984 2.38281C21.3672 4.02344 21.3672 7.53906 21.3672 7.53906C21.3672 7.53906 21.3672 11.0156 20.8984 12.6953C20.6641 13.6328 19.9219 14.3359 19.0234 14.5703C17.3438 15 10.7031 15 10.7031 15C10.7031 15 4.02345 15 2.34376 14.5703C1.44532 14.3359 0.703137 13.6328 0.468762 12.6953C1.23978e-05 11.0156 1.23978e-05 7.53906 1.23978e-05 7.53906C1.23978e-05 7.53906 1.23978e-05 4.02344 0.468762 2.38281C0.703137 1.44531 1.44532 0.703125 2.34376 0.46875C4.02345 0 10.7031 0 10.7031 0C10.7031 0 17.3438 0 19.0234 0.46875C19.9219 0.703125 20.6641 1.44531 20.8984 2.38281ZM8.51564 10.7031L14.0625 7.53906L8.51564 4.375V10.7031Z"
                      fill="#FC4B4E"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="socialIcon cursor-pointer"
                  aria-label="LinkedIn (coming soon)"
                  onClick={notifyComingSoon("Social pages are coming soon")}
                >
                  {/* LinkedIn SVG */}

                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.25 0C16.9141 0 17.5 0.585938 17.5 1.28906V16.25C17.5 16.9531 16.9141 17.5 16.25 17.5H1.21095C0.546887 17.5 1.23978e-05 16.9531 1.23978e-05 16.25V1.28906C1.23978e-05 0.585938 0.546887 0 1.21095 0H16.25ZM5.27345 15V6.67969H2.69532V15H5.27345ZM3.98439 5.50781C4.8047 5.50781 5.46876 4.84375 5.46876 4.02344C5.46876 3.20312 4.8047 2.5 3.98439 2.5C3.12501 2.5 2.46095 3.20312 2.46095 4.02344C2.46095 4.84375 3.12501 5.50781 3.98439 5.50781ZM15 15V10.4297C15 8.20312 14.4922 6.44531 11.875 6.44531C10.625 6.44531 9.76564 7.14844 9.41407 7.8125H9.37501V6.67969H6.91407V15H9.4922V10.8984C9.4922 9.80469 9.68751 8.75 11.0547 8.75C12.3828 8.75 12.3828 10 12.3828 10.9375V15H15Z"
                      fill="#145DB8"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Column 2 */}
          <div className="footerCol">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/choose-specialist">Doctors</Link>
                </li>
                <li>
                  {/* Real page section: scrolls to the FAQ block on the home page */}
                  <Link to="/#faq">FAQs</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="footerCol">
              <h4>Support</h4>
              <ul>
                <li>
                  <Link to="/contact-us">Help Center</Link>
                </li>
                <li>
                  {/* Real page section: scrolls to "How it works" on the home page */}
                  <Link to="/#how-it-works">How it works</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-of-service">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="footerCol">
              <h4>Contact Info</h4>
              <ul className="contactList">
                <li>
                  <Phone size={16} />
                  <div>
                    <span>Phone</span>
                    <p>080 707 555-321</p>
                  </div>
                </li>
                <li>
                  <Mail size={16} />
                  <div>
                    <span>Email</span>
                    <p>demo@example.com</p>
                  </div>
                </li>
                <li>
                  <MapPin size={16} />
                  <div>
                    <span>Address</span>
                    <p>
                      526 Melrose Street,
                      <br />
                      Water Mill, 11976 New York
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footerBottom">
            <p>@2024 Techvio - All Right Reserved</p>
            <div className="footerLinks">
              <Link to="/terms-of-service">Terms & Condition</Link> |{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
