import Doelstelling from '../components/Doelstelling';
import Accords from '../components/Accords';
import DOELSTELLING_DATA from '../mock-data';
import { useDoelstellingen} from '../contexts/DoelstellingProvider';

export default function CategorieDashboard() {
  const {doelstellingen} = useDoelstellingen();

  return (
    <>
      <div className="m-2 border-2 border-[#004C69]">
        <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          <div className="ml-2">DashBoard - Economie</div>
          <div className="justify-self-end mr-2">Sdgs</div>
        </div>

        {/*
        {DOELSTELLING_DATA.map(trans => 
				<Doelstelling {...trans} />)}
        */}

      {doelstellingen.map(d => <Doelstelling key={d.id} { ...d }  ></Doelstelling>)}

        {/*<Doelstelling {...doelstellingen[0]}></Doelstelling>*/}
 
      </div>
    </>
  );
}