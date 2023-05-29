import spinner from "../public/spinner.gif";
import Image from "next/image";

const Spinner = () => {
  return (
    <>
      <Image
        classname="w-[200px] m-auto block"
        src={spinner}
        alt="loading..."
      />
    </>
  );
};
export default Spinner;
