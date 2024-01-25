import Image from "next/image";

const Card = ({ src, title, price, plan, isSelected, onSelect, extra }) => {
  return (
    <div
      className={`card ${isSelected ? "activeCard" : ""}`}
      onClick={() => onSelect(title)}
    >
      <div className="cardImage">
        <Image
          src={src}
          height={60}
          width={60}
          layout="responsive"
          alt={`${title}`}
          className="cardImage"
        ></Image>
      </div>
      <div className="cardDetails">
        <h2 className="cardTitle">{title}</h2>
        <p className="cardPrice">
          ${price}/{plan}
        </p>
        <p className="extra">{extra}</p>
      </div>
    </div>
  );
};

export default Card;
