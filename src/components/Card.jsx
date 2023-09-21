const Card = ({ img }) => {
  return (
    <li className="h-[17rem] w-full">
      <img className="object-cover h-full w-full" src={img} alt="" />
    </li>
  );
};
export default Card;
