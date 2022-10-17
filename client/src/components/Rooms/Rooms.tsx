import { useAppSelector } from "../../redux/store";
import Room from "./Room";

interface IRooms {}

export interface IRoom {
  name: string,
  number: number,
  occupant: string
}

const Rooms: React.FC<IRooms> = () => {
  const rooms = useAppSelector((state) => state.rooms);
  console.log(rooms)

  return (
    <div className="w-8/12 h-screen">
      <h1 className="text-center">
        Rooms
      </h1>
      <div className="border-solid border-2 border-black h-4/6 m-5">
        {rooms.map((room: IRoom) => (
          <div key={room.number} className="">
            <Room name={room.name} number={room.number} occupant={room.occupant} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Rooms;