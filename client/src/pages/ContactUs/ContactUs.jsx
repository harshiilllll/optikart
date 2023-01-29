import { useSelector } from "react-redux";
import "./ContactUs.scss";

const ContactUs = () => {
  const brand = useSelector((state) => state.settings);
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <span>{brand.address}</span>
      <span>
        <b>Email:</b>
        {brand.brandEmail}
      </span>
      <span>
        <b>Number:</b>
        {brand.brandNumber}
      </span>
    </div>
  );
};

export default ContactUs;
