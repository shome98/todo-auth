import { Provider } from "react-redux";
import store from "./store/store";

export default function Home() {
  return (
    <><Provider store={store}><h1 className="font-bold mt-9 ml-8">Yo this is me</h1></Provider></>
  );
}
