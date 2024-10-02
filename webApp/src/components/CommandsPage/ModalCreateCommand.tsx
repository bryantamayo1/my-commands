import './ModalCreateCommand.css';
import {useState, useEffect}      from 'react'
import Button                     from '@mui/material/Button';
import AddIcon                    from '@mui/icons-material/Add';
import { SessionStorage }         from '../../utils/SessionStorage';
import Modal                      from '@mui/material/Modal';
import Box                        from '@mui/material/Box';
import CloseIcon                  from '@mui/icons-material/Close';
import { useFormik }              from 'formik';
import * as Yup                   from 'yup';
import { ServicesCategories }     from '../../services/ServicesCategories';
import { InterfaceGetFilters }    from '../../interfaces/Categories';
import MenuItem                   from '@mui/material/MenuItem';
import { parseVersion }           from '../../utils/ParseData';
import TextField                  from '@mui/material/TextField';
import { constLanguages }         from '../../utils/Constants';
import Editor                     from '@monaco-editor/react';
import { ServicesCommands }       from '../../services/ServicesCommands';
import { toast }                  from 'react-toastify';

type PropsModalCreateCommand = {
  getCommands: () => void
}

type typeStateInitial = {
  openModalCreate: boolean,
  categories: InterfaceGetFilters,
}

const StateInitial: typeStateInitial = {
  openModalCreate: false,
  categories: {} as InterfaceGetFilters,
}

export const ModalCreateCommand = ({ getCommands }: PropsModalCreateCommand) => {
  ////////
  // Hooks
  ////////
  const [state, setState] = useState(StateInitial);

  useEffect(() => {
    getCategories();
  }, []);

  ////////////
  // Functions
  ////////////
  const getCategories = async () => {
    const resp = await ServicesCategories.getCategories();
    resp.data.shift();
    setState(prevState => ({ ...prevState, categories: resp,}));
  }

  // Define form with formik
  const formik = useFormik({
    initialValues: {
      id_category: '',
      language: '',
      command: '',
      en: '#',
      es: '#',
    },
    validationSchema: Yup.object({
      id_category: Yup.string().required('Category is required'),
      language: Yup.string().required('Language is required'),
      command: Yup.string().required('Command is required').max(10000, "10000 characters is maximum"),
      en: Yup.string().required('Meaning english is required').max(10000, "10000 characters is maximum"),
      es: Yup.string().required('Meaning spanish is required').max(10000, "10000 characters is maximum"),
    }),
    onSubmit: async values => {
      const newValues = structuredClone(values);
      // @ts-ignore
      delete newValues.id_category;

      await ServicesCommands.createCommand(values.id_category, newValues);
      // Active toastify
      toast.success("Created command sucessfully", {
        position: toast.POSITION.BOTTOM_LEFT
      });

      handleCloseModalCreate();
      getCommands();
    }
  });
  
  const handleOpenModal = () => {
    setState( prevstate => ({...prevstate, openModalCreate: !prevstate.openModalCreate}));
  }

  const handleCloseModalCreate = () => {
    setState( prevstate => ({...prevstate, openModalCreate: !prevstate.openModalCreate}));
  }

  const handleEditorChangeEn = (value: any, event: any) => {
    formik.setFieldValue("en", value);
    setState( prevstate => ({ ...prevstate, en: value }));
  }

  const handleEditorChangeEs = (value: any, event: any) => {
    formik.setFieldValue("es", value);
  }

  const handleEditorChangeCommand = (value: any, event: any) => {
    formik.setFieldValue("command", value);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    maxHeight: "90vh",
    overflowX: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="contained" color="secondary" size="small"
        onClick={() => handleOpenModal()}
        style={{ marginTop: 15 }}
        disabled={SessionStorage.getItem("user").role === "GUEST"}
      >
        <AddIcon fontSize="small"/>
      </Button>

      {/* Modal: create Category */}
      <Modal
        open={state.openModalCreate}
        onClose={handleCloseModalCreate}
        aria-labelledby="modal-modal-title-delete"
        aria-describedby="modal-modal-description-delete"
      >
        <Box sx={style}>
          {/* Btn close modal */}
          <div className='mc-modal-btn-close '>
            <Button color="inherit" style={{ minWidth: 20 }} onClick={handleCloseModalCreate}>
              <CloseIcon/>
            </Button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <p className="mc-modal-create-category-title">
              Create command
            </p>

            {/* Select category */}
            <div className='mc-modal-create-command-field'>
              <TextField
                id="outlined-select-categories"
                select
                label="Categories"
                name="id_category"
                value={formik.values.id_category}
                // @ts-ignore
                error={ formik.touched.id_category && formik.errors.id_category }
                helperText={formik.errors.id_category}
                onChange={formik.handleChange}
                style={{ width: "100%" }}
                >
                {state.categories.data?.map( item => (
                  <MenuItem key={item._id} value={item._id}>
                    {parseVersion(item)}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Language,it can be sql, css, ... */}
            <div className='mc-modal-create-command-field'>
              <TextField
                id="outlined-select-categories"
                select
                label="Language"
                name="language"
                value={formik.values.language}
                // @ts-ignore
                error={ formik.touched.language && formik.errors.language }
                helperText={formik.errors.language}
                onChange={formik.handleChange}
                style={{ width: "100%" }}
              >
                {constLanguages.map( item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Command */}
            <div className='mc-label-modal-creete-command'>
              Command
            </div>
            <Editor height="30vh" defaultLanguage="powershell"
              theme="vs-dark"
              value={formik.values.command}
              onChange={handleEditorChangeCommand}
            />
            {formik.touched.command && formik.errors.command && (
              <div className='error-formik-msg'>{formik.errors.command}</div>
            )}

            {/* Meaning in language en */}
            <div className='mc-label-modal-creete-command'>
              Meaning in english
            </div>
            <Editor height="30vh" defaultLanguage="powershell" defaultValue="#"
              theme="vs-dark"
              value={formik.values.en}
              onChange={handleEditorChangeEn}
            />
            {formik.touched.en && formik.errors.en && (
              <div className='error-formik-msg'>{formik.errors.en}</div>
            )}
            
            {/* Meaning in language es */}
            <div className='mc-label-modal-creete-command'>
              Meaning in spanish
            </div>
            <Editor height="30vh" defaultLanguage="powershell" defaultValue="#"
              theme="vs-dark"
              value={formik.values.es}
              onChange={handleEditorChangeEs}
            />
            {formik.touched.es && formik.errors.es && (
              <div className='error-formik-msg'>{formik.errors.es}</div>
            )}

            <div className='mc-modal-create-command-btn-submit'>
              <Button variant="contained" color="secondary"
                type="submit">
                Create
              </Button>
            </div>

          </form>

        </Box>
      </Modal>
    </>
  )
}
