import { Auth, Header, Rooms } from "./components";

const App: React.FC = () => {
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
