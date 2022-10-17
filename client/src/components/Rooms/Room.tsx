import { useAppDispatch } from "../../redux/store";
import { IRoom } from "./Rooms";


const Room: React.FC<IRoom> = (room: IRoom) => {
  const dispatch = useAppDispatch();


  return (
    <div className="">
      <div className="">
        <h6>{room.name}</h6>
      </div>

      <h5 className="" >
        {room.number}
      </h5>
      <div>
          {room.occupant}
      </div>    
    </div >
  );
};

export default Room;