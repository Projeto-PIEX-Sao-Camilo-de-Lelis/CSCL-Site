import { CiInstagram, CiFacebook, CiYoutube } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
export default function SocialMedia() {
  return (
    <div className="social-icons">
      <a
        className="btn"
        href="https://www.instagram.com/casasaocamilodelelis/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CiInstagram size={25} />
      </a>
      <a
        className="btn"
        href="https://www.facebook.com/casasaocamilodelelis/?locale=pt_BR"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CiFacebook size={25} />
      </a>
      <a
        className="btn"
        href="https://www.youtube.com/@casasaocamilodelelisjf6246"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CiYoutube size={25} />
      </a>
      <a className="btn" href="mailto:casasaocamilodelelis@gmail.com">
        <AiOutlineMail size={25} />
      </a>
    </div>
  );
}
