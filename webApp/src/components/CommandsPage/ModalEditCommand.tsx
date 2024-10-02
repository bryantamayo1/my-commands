import './ModalEditCommand.css';
import {useState, useEffect}    from 'react'
import Button                   from '@mui/material/Button';
import { SessionStorage }       from '../../utils/SessionStorage';
import Modal                    from '@mui/material/Modal';
import Box                      from '@mui/material/Box';
import CloseIcon                from '@mui/icons-material/Close';
import { useFormik }            from 'formik';
import * as Yup                 from 'yup';
import MenuItem                 from '@mui/material/MenuItem';
import { parseVersion }         from '../../utils/ParseData';
import TextField                from '@mui/material/TextField';
import { constLanguages }       from '../../utils/Constants';
import Editor                   from '@monaco-editor/react';
import { ServicesCommands }     from '../../services/ServicesCommands';
import EditIcon                 from '@mui/icons-material/Edit';
import { CommandData }          from '../../interfaces/Commands';
import { toast }                from 'react-toastify';

type PropsModalCreateCommand = {
  getCommands: () => void,
  item: CommandData,
}

type categoryFather = {
  _id: string,
  version: string,
  category: string
}

type typeStateInitial = {
  openModalEdit: boolean,
  categories: categoryFather[],
  user: any
}

const StateInitial: typeStateInitial = {
  openModalEdit: false,
  categories: [],
  user: ""
}

export const ModalEditCommand = ({ getCommands, item }: PropsModalCreateCommand) => {
  ////////
  // Hooks
  ////////
  const [state, setState] = useState(StateInitial);

  useEffect(() => {
    getUserSessionStorage();

    setState(prevState => ({
      ...prevState, 
      categories: [
        {
          _id: item.categoryFather._id,
          version: item.categoryFather.version,
          category: item.categoryFather.category
        }
      ]
    }));

    formik.setFieldValue("id_category", item.categoryFather._id);
    formik.setFieldValue("language", item.language);
    formik.setFieldValue("command", item.command);
    formik.setFieldValue("en", item.en);
    formik.setFieldValue("es", item.es);

    setTimeout(() => {
      formik.setErrors({});
    }, 100);
  }, []);

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
      await ServicesCommands.editCommand(item.categoryFather._id, item._id, newValues);
      // Active toastify
      toast.success("Edited command sucessfully", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      handleCloseModalEdit();
      getCommands();
    }
  });
  
  ////////////
  // Functions
  ////////////
  const getUserSessionStorage = () => {
    setState(prevState => ({ ...prevState, user: SessionStorage.getItem("user") }));
  }

  const handleOpenModal = () => {
    setState( prevstate => ({...prevstate, openModalEdit: !prevstate.openModalEdit}));
  }

  const handleCloseModalEdit = () => {
    setState( prevstate => ({...prevstate, openModalEdit: !prevstate.openModalEdit}));
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
      <Button variant="contained" color='secondary' size='small'
        onClick={() => handleOpenModal()}
        style={{ minWidth: 40, width: 40 }}
        disabled={state.user?.role === "GUEST" || state.user?._id !== item.owner }
      >
        <EditIcon fontSize="small"/>
      </Button>

      {/* Modal: edit Category */}
      <Modal
        open={state.openModalEdit}
        onClose={handleCloseModalEdit}
        aria-labelledby="modal-modal-title-delete"
        aria-describedby="modal-modal-description-delete"
      >
        <Box sx={style}>
          {/* Btn close modal */}
          <div className='mc-modal-btn-close '>
            <Button color="inherit" style={{ minWidth: 20 }} onClick={handleCloseModalEdit}>
              <CloseIcon/>
            </Button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <p className="mc-modal-create-category-title">
              Edit command
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
                disabled
                >
                {state.categories?.map( item => (
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
                Edit
              </Button>
            </div>

          </form>

        </Box>
      </Modal>
    </>
  )
}
