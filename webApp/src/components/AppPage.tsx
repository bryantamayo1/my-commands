import { Outlet } from 'react-router-dom'
import { MenuMc } from './Menu/Menu'

export const AppPage = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <MenuMc/>
      <Outlet/>
    </div>
  )
}
