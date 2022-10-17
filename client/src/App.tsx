import { useEffect } from "react";
import { fetchRooms } from "./redux/actions/rooms.actions";
import { useAppDispatch } from "./redux/store";
import { Auth, Header, Rooms } from "./components";

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch<any>(fetchRooms());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="container mx-auto my-5 flex justify-between">
        <Rooms />
        <Auth />
      </div>
    </div>
  );
}

export default App;
