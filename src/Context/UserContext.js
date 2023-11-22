import { createContext, useState , useEffect} from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Rest of your component code
  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
