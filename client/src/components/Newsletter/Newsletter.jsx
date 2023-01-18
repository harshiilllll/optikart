import "./Newsletter.scss";
import SendIcon from "@mui/icons-material/Send";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1 className="title">Newsletter</h1>
      <div className="desc">
        Get exclusive access to promotions, discounts, and new product launches
        by signing up for our newsletter. Never miss out on a great deal again!
      </div>
      <form className="form">
        <input type="email" placeholder="Your email" />
        <button>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
