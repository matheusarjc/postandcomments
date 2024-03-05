import backgroundImage from "../../../assets/background1.svg";

const BackgroundS: React.FC = () => {
  return (
    <div>
      <img src={backgroundImage} alt="Background" className="w-screen h-screen object-cover" />
    </div>
  );
};

export default BackgroundS;
