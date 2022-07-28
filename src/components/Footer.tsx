import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 - Phanox - All Rights Reserverd</p>
      <p className="icons">
        <a href="https://github.com/IzaiasMorais">
          <AiFillGithub />
        </a>
        <a href="https://www.instagram.com/_izaias_morais/">
          <AiFillInstagram />
        </a>
        <a href="https://twitter.com/Izaias_lima_">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
};

export default Footer;
