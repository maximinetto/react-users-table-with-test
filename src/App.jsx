import { ReactNotifications } from "react-notifications-component";
import "./App.css";
import UserManagement from "./Components/UserManagement";

function App() {
  return (
    <div>
      <ReactNotifications />
      <UserManagement />
    </div>
  );
}

export default App;
