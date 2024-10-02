import './CategoriesPage.css';
import { useEffect, useState }  from 'react';
import { ServicesCategories }   from '../../services/ServicesCategories';
import { InterfaceGetFilters }  from '../../interfaces/Categories';
import Button                   from '@mui/material/Button';
import AddIcon                  from '@mui/icons-material/Add';
import EditIcon                 from '@mui/icons-material/Edit';
import DeleteIcon               from '@mui/icons-material/Delete';
import Modal                    from '@mui/material/Modal';
import Box                      from '@mui/material/Box';
import moment                   from 'moment';
import { useFormik }            from 'formik';
import * as Yup                 from 'yup';
import { TextField }            from '@mui/material';
import CloseIcon                from '@mui/icons-material/Close';
import { SessionStorage }       from '../../utils/SessionStorage';
import { ModalConfirmDelete }   from '../common/ModalConfirmDelete';
import { toast }                from 'react-toastify';
import { Spinner }              from '../common/Spinner/Spinner';

type typeCreateOrEditCategory = {
  category: string,
  version: string,
  _id: string
}

type typeStateInitial = {
  categories: InterfaceGetFilters,
  openModalCreateOrEdit: boolean,
  selectedCategory: typeCreateOrEditCategory
  createOrEdit: boolean,   // false = create, true = edit
  openModalDelete: boolean,
  activeSpinner: boolean,
  user: any
}

const StateInitial:typeStateInitial = {
  categories: {} as InterfaceGetFilters,
  openModalCreateOrEdit: false,
  selectedCategory: {} as typeCreateOrEditCategory,
  createOrEdit: false,
  openModalDelete: false,
  activeSpinner: false,
  user: ""
}

export const CategoriesPage = () => {
  ////////
  // Hooks
  ////////
  const [state, setState] = useState(StateInitial);

  // Define form with formik
  const formik = useFormik({
    initialValues: {
      category: '',
      version: ''
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required').max(100, "100 characters is maximum"),
      version: Yup.string().required('Version is required').max(100, "100 characters is maximum")
    }),
    onSubmit: async values => {
      // Edit
      if(state.createOrEdit){
        await ServicesCategories.editCategory(state.selectedCategory._id, values);
        
        // Active toastify
        toast.success("Edited category sucessfully", {
          position: toast.POSITION.BOTTOM_LEFT
        });

        getCategories();
        handleCloseModalCreateOrEdit();
      // Create
      }else{
        await ServicesCategories.createCategory(values);

        // Active toastify
        toast.success("Created category sucessfully", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        getCategories();
        handleCloseModalCreateOrEdit();
      }
    }
  });

  useEffect(() => {
    // Update title
    document.title = "My commands | Categories";

    getUserSessionStorage();

    getCategories();
  }, []);
  
  ////////////
  // Functions
  ////////////
  const getUserSessionStorage = () => {
    setState(prevState => ({ ...prevState, user: SessionStorage.getItem("user") }));
  }

  const getCategories = async () => {
    // Active spinner
    setState(prevState => ({ ...prevState, activeSpinner: true }));
    const resp = await ServicesCategories.getCategories();
    resp.data.shift();
    setState(prevState => ({ ...prevState, categories: resp, activeSpinner: false }));
  }

  const handleOpenModalCreateOrEdit = (category?: typeCreateOrEditCategory) => {
    // Edit
    if(category){
      formik.resetForm();
      formik.setFieldValue("category", category.category);
      formik.setFieldValue("version", category.version);
      setTimeout(() => {
        formik.setErrors({});
      }, 100);

      setState(prevState => ({
        ...prevState,
        openModalCreateOrEdit: true,
        selectedCategory: category,
        createOrEdit: true
      }));

    // Create
    }else{
      formik.resetForm();
      setState(prevState => ({
        ...prevState,
        openModalCreateOrEdit: true,
        selectedCategory: {} as typeCreateOrEditCategory,
        createOrEdit: false
      }));
    }
  }

  const handleCloseModalCreateOrEdit = () => {
    formik.resetForm();
    setState(prevState => ({ ...prevState, openModalCreateOrEdit: false }));
  }

  const handleCloseModalDelete = () => {
    setState(prevState => ({ ...prevState, openModalDelete: false }));
  }

  const handleOpenModalDelete = (category: typeCreateOrEditCategory) => {
    setState(prevState => ({
      ...prevState,
      openModalDelete: true,
      selectedCategory: category,
    }));
  }

  const deleteCategory =  async () => {
    await ServicesCategories.deleteCategory(state.selectedCategory._id);
    // Active toastify
    toast.success("Deleted category sucessfully", {
      position: toast.POSITION.BOTTOM_LEFT
    });
    getCategories();
    handleCloseModalDelete();
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: 200,
      sm: 400
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className='mc-container-page'>
      <Spinner active={state.activeSpinner}>
        <div className='mc-container-box mc-container-categories'>
          <Button variant="contained" color="secondary" size="small"
            onClick={() => handleOpenModalCreateOrEdit()}
            disabled={state.user?.role === "GUEST"}
          >
            <AddIcon fontSize="small"/>
          </Button>

          <div className='mc-categories-info'>
            <div>
              Total categories: {state.categories.results}
            </div>
            <div>
              Total commands: {state.categories.totalCommands}
            </div>
          </div>

          <div className='mc-table-categories'>
            <table className='mc-table'>
              {/* Header */}
              <tr className='mc-table--header'>
                <th>Category</th>
                <th>Version</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Commands</th>
              </tr>

              {/* Body */}
              {state.categories.data?.map( ({ category, version, createdAt, updatedAt, results, _id, owner }) => (
                <tr key={_id}>
                  <td>{category}</td>
                  <td>{version}</td>
                  <td>{moment(createdAt).format("YYYY-MM-DD")}</td>
                  <td>{moment(updatedAt).format("YYYY-MM-DD")}</td>
                  <td>{results}</td>

                  <td>
                    <Button variant="contained" color='secondary' size="small" className='mc-btn'
                      disabled={state.user?.role === "GUEST" || owner !== state.user?._id }
                      onClick={() => handleOpenModalCreateOrEdit({category, version, _id: _id })}
                    >
                      <EditIcon fontSize="small"/>
                    </Button>
                  </td>

                  <td>
                    <Button variant="contained" color='secondary' size="small" className='mc-btn'
                      disabled={state.user?.role === "GUEST" || owner !== state.user?._id }
                      onClick={() => handleOpenModalDelete({category, version, _id: _id })}
                    >
                      <DeleteIcon fontSize="small"/>
                    </Button>
                  </td>

                </tr>
              ))}
            </table>
          </div>
        </div>
      </Spinner>

      {/* Modal: create or edit category */}
      <Modal
        open={state.openModalCreateOrEdit}
        onClose={handleCloseModalCreateOrEdit}
        aria-labelledby="modal-modal-title-edit-and-create"
        aria-describedby="modal-modal-description-edit-and-create"
      >
       <Box sx={style}>
          {/* Btn close modal */}
          <div className='mc-modal-btn-close '>
            <Button color="inherit" style={{ minWidth: 20 }} onClick={handleCloseModalCreateOrEdit}>
              <CloseIcon/>
            </Button>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <p className="mc-modal-create-category-title">
              {state.createOrEdit? `Edit category ${state.selectedCategory.category}` : "Create category"}
            </p>

            <div className='mc-modal-create-category-divider'>
              <TextField id="category" fullWidth label="Category" variant="standard"
                name="category" type="text" 
                onChange={formik.handleChange} value={formik.values.category}
                helperText={formik.errors.category}
                // @ts-ignore
                error={ formik.touched.category && formik.errors.category }
              />
            </div>

            <div className='mc-modal-create-category-divider'>
              <TextField id="version" fullWidth label="Version" variant="standard"
                name="version" type="text" 
                onChange={formik.handleChange} value={formik.values.version}
                helperText={formik.errors.version}
                // @ts-ignore
                error={ formik.touched.version && formik.errors.version }
              />
            </div>

            <div className='mc-modal-create-category-btn-submit'>
              <Button variant="contained" color="secondary"
                type="submit">
                {state.createOrEdit? "Edit": "Create"}
              </Button>
            </div>

          </form>
       </Box>
      </Modal>

      {/* Modal: delete category */}
      <ModalConfirmDelete
          open={state.openModalDelete}
          onClose={handleCloseModalDelete}
          ariaLabelledby="modal-modal-title-delete"
          ariaDescribedby="modal-modal-description-delete"
          title={`Delete category ${state.selectedCategory.category}`}
          message="It is going to delete all commands with subcategorues associared to this category!"
          deleteItem={deleteCategory}
      />
    </div>
  )
}
