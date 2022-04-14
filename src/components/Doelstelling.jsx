export default function Doelstelling(props) {
  const {name} = props;

  return (
    <>
        <div className="border-2 border-[#004C69] text-left p-1 m-2">
          <div className="grid grid-cols-2">
            <div>{name}</div>
            <div className="justify-self-end">Grafiek</div>
          </div>
        </div>
        
    </>
  );
}