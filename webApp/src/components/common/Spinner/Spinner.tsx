import './Spinner.css';
import CircularProgress from '@mui/material/CircularProgress';

type SpinnerProps = {
  active: boolean,
  children: React.ReactNode,
  big?: boolean
}
export const Spinner = ({ active, children, big = false }: SpinnerProps) => {
  return (
    <>
      {active?
        <div className={big? 'mc-container-spinner-big' : 'mc-container-spinner'}>
          <CircularProgress color="secondary" size={50}/>
        </div>
      :
      children
    }
    </>
  )
}
