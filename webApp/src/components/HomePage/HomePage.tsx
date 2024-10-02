import './HomePage.css';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useState }        from 'react';
import { ServicesCategories }         from '../../services/ServicesCategories';
import { InterfaceGetFilters }        from '../../interfaces/Categories';
import { useCalculateWindow }         from '../../hooks/useCalculateWindow';
import { Spinner }                    from '../common/Spinner/Spinner';

type typePieChart = {
  name: string,
  value: number,
  color: string
}

type typeStateInitial = {
  categories: typePieChart[],
  resp: InterfaceGetFilters,
  activeSpinner: boolean
}

const StateInitial: typeStateInitial = {
  categories: [] as typePieChart[],
  resp: {} as InterfaceGetFilters,
  activeSpinner: false
}

export const HomePage = () => {
  ////////
  // Hooks
  ////////
  const [state, setState] = useState(StateInitial);
  const {innerWidth} = useCalculateWindow();


  useEffect(() => {
    // Update title
    document.title = "Home";

    getCategories();
  }, []);

  const getCategories = async () => {
    // Active spinner
    setState(prevState => ({ ...prevState, activeSpinner: true }));
    const resp = await ServicesCategories.getCategories();
    const respOriginal = structuredClone(resp);
    resp.data.shift();
    const newResp = resp.data.map(item => {
      return {
        name: item.category,
        value: item.results,
        color: generateRandomColors()
      }
    });
    setState(prevState => ({ ...prevState, categories: newResp, resp: respOriginal, activeSpinner: false }));
  }

   const generateRandomColors = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const calculateSizeDonut = () => {
    if(innerWidth > 1200){
      return 250;
    }else if(innerWidth >600 && innerWidth <= 1200){
      return 200;
    }
  }

  return (
    <div className='mc-container-page'>
      <Spinner active={state.activeSpinner}>
        <div className='mc-d-container-dashboard'>
          <div className='mc-d-container-dashboard--donut'>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={800} height={800}>
                <Pie
                  dataKey="value"
                  data={state.categories}
                  cx="50%"
                  cy="50%"
                  outerRadius={calculateSizeDonut()}
                  label
                >
                  {state.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* List */}
          <table className='mc-h-table'>
            <tr className='mc-table--header'>
              <th></th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
              
            <tr>
              <th></th>
              <td>{state.resp.data?.length > 0 && state.resp.data[0].category}</td>
              <td style={{ textAlign: "end" }}>{state.resp.data?.length > 0 && state.resp.data[0].results}</td>
            </tr>
            {state.categories.map(item => (
              <tr>
                <td>
                  <div className='mc-square' style={{ backgroundColor: item.color }}></div>
                </td>
                <td>{item.name}</td>
                <td style={{ textAlign: "end" }}>{item.value}</td>
              </tr>
            ))}
          </table>
        </div>

      </Spinner>
    </div>
  )
}
