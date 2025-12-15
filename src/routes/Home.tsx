import Side from "../components/skin/Side";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <>
      <div className="bg-orange-600 w-1/4 h-3/12 rounded-t-full absolute bottom-0 -left-50 z-0">
        {" "}
      </div>
      <div className="z-10 h-full  flex items-center justify-between border-black">
        <div className="  px-3  w-1/2 flex flex-col ">
          <h1 className="text-9xl titleFont mb-8 ">
            The best way to create survey
          </h1>
          <h3 className="font-semibold">
            Feedback? new market? satisfaction? Here you can create your
            survey in a minute !
          </h3>
          <h3 className="font-bold -rotate-3 bg-fuchsia-500 text-lg w-fit text-white px-2">
            Try it for free !
          </h3>
          <div className="flex  justify-center gap-5 mt-auto">
            <Button className="bg-green-500" text="Create my survey"/>
            <Button className="bg-yellow-500" text="Check available surveys"/>
          </div>
          <div className="flex  items-end gap-3 ml-auto mt-4">
            <img className="w-20" src="src/assets/arrow2.png" alt="" />
            <p className="font-semibold">
              Something to say? Opinions to share?
            </p>
          </div>
        </div>
        <div className="w-1/3 relative h-full flex items-center justify-center ">
          <div className="bg-fuchsia-500 w-3/4 h-10/12 rounded-b-full absolute top-0 left-7 z-0">
            {" "}
          </div>
          <div className="bg-green-500 w-3/4 h-7/12 rounded-t-full absolute bottom-0 right-0 z-0">
            {" "}
          </div>
          <img className="z-30" src="src/assets/home2.png" alt="" />
        </div>
        <Side/>
      </div>
    </>
  );
};

export default Home;
