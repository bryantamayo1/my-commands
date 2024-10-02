import './UserPage.css';
import { useEffect }      from 'react';
import { SessionStorage } from '../../utils/SessionStorage';

const ColoredLine = () => (
  <hr
      style={{
          backgroundColor: "#FFF",
          height: 0.1
      }}
  />
);

export const UserPage = () => {
  ////////
  // Hooks
  ////////
  useEffect(() => {
    // Update title
    document.title = "My commands | User";
  }, []);
  


  return (
    <div className='mc-container-page'>
      <div className='mc-container-box mc-container-userpage'>
        Profile
        <ColoredLine/>

        <div className='mc-container-table-userpage '>
          <table>
            {/* Header */}
            <tr>
              <th></th>
              <th></th>
            </tr>

            {/* Body */}
            <tr>
              <td>Email</td>
              <td>
                <span>
                  {SessionStorage.getItem("user")?.email}
                </span>
              </td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{SessionStorage.getItem("user")?.role}</td>
            </tr>
            <tr>
              <td>User name</td>
              <td>{SessionStorage.getItem("user")?.userName}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}
