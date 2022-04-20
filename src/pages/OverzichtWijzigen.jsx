import werken from "../images/werken.png";

export default function  OverzichtWijzigen () {
  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-1">
        <div className="p-20 m-20">
          <p className="font-bold text-xl">Overzicht wijzigen</p>
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