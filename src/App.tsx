import { RecoilRoot } from "recoil"
import Routers from "./utils/routes"

export default function App() {
  return (
    <div>
    <RecoilRoot >
      <Routers/>  
    </RecoilRoot>
    </div>
  )
}
