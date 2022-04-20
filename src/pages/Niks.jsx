import werken from "../images/werken.png";
export default function  Niks () {
  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-1">
        <div className="p-20 m-20">
          <p className="font-bold text-xl">Hier komt nog iets</p>
          <img
                  src={werken}
                  alt="werken"
                  className="w-1/3 block mt-2 lg:block lg:mt-0 "
                />
        </div>
      </div>
      
  </>
  );
};