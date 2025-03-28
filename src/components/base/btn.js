export default function Btn({ action, logo, alt }) {
  return <img src={logo} alt={alt} onClick={action} className="btn-side" />;
}
