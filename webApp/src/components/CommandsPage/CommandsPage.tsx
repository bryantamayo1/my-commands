import './CommandsPage.css';
import Select, { SelectChangeEvent }  from '@mui/material/Select';
import MenuItem                       from '@mui/material/MenuItem';
import InputLabel                     from '@mui/material/InputLabel';
import FormControl                    from '@mui/material/FormControl';
import TextField                      from '@mui/material/TextField';
import { ServicesCategories }         from '../../services/ServicesCategories';
import { useEffect, useState, ChangeEvent } from 'react';
import { InterfaceGetFilters }        from '../../interfaces/Categories';
import { parseVersion }               from '../../utils/ParseData';
import Checkbox                       from '@mui/material/Checkbox';
import FormControlLabel               from '@mui/material/FormControlLabel';
import Button                         from '@mui/material/Button';
import SearchIcon                     from '@mui/icons-material/Search';
import { ServicesCommands }           from '../../services/ServicesCommands';
import CodeMirror                     from '@uiw/react-codemirror';
import { loadLanguage }               from '@uiw/codemirror-extensions-langs';
import {xcodeDark}                    from '@uiw/codemirror-theme-xcode';
import { CommandData, InterfaceCommands } from '../../interfaces/Commands';
import ContentCopyIcon                from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon              from '@mui/icons-material/DeleteForever';

import { SessionStorage }             from '../../utils/SessionStorage';
import { ModalCreateCommand }         from './ModalCreateCommand';
import { ModalConfirmDelete }         from '../common/ModalConfirmDelete';
import { ModalEditCommand }           from './ModalEditCommand';
import { createPagination }           from '../../utils/Constants';
import { toast }                      from 'react-toastify';
import { Spinner }                    from '../common/Spinner/Spinner';

// Types
type typePagination = {
  active: boolean,
  index: number
}

type typeStateInitial = {
  categories: InterfaceGetFilters,
  commands: InterfaceCommands,
  selectedSearchCommandFilter: string,
  selectedCategoryFilter: string,
  checkCommandAndMenaning: boolean,
  checkCommands: boolean,
  checkMeaning: boolean,
  openModalDelete: boolean

  // Pagination
  pagination: typePagination[],
  activedPage: number

  // List of commands
  selectedCommand: CommandData,

  activeSpinner: boolean

  user: any
}

const StateInitial:typeStateInitial = {
  categories: {} as InterfaceGetFilters,
  commands: {} as InterfaceCommands,
  selectedSearchCommandFilter: '',
  selectedCategoryFilter: "",
  checkCommandAndMenaning: true,
  checkCommands: false,
  checkMeaning: false,
  openModalDelete: false,

  // Pagination
  pagination: createPagination(),
  activedPage: 1,

  // List of commands
  selectedCommand: {} as CommandData,

  activeSpinner: false,

  user: ""
}

export const CommandsPage = () => { 
  ////////////
  // Constants
  ////////////
  const limitPagination = 5;

  ////////
  // Hooks
  ////////
  const [state, setState] = useState(StateInitial);

  useEffect(() => {
    // Update title
    document.title = "My commands | Commands";

    getUserSessionStorage();

    getCategories();

    createPagination();

    getCommands({
      page: 1,
      category: 'all'
    });
  }, []);

  ////////////
  // Functions
  ////////////
  const getUserSessionStorage = () => {
    setState(prevState => ({ ...prevState, user: SessionStorage.getItem("user") }));
  }

  const getCategories = async () => {
    const resp = await ServicesCategories.getCategories();
    setState(prevState => ({ ...prevState, categories: resp, selectedCategoryFilter: "all" }));
  }

  /**
   * Get commands and calculate pagination 
   */
  const getCommands = async (query: any) => {
    // Active spinner
    setState(prevState => ({ ...prevState, activeSpinner: true }));
    // 1* Get commands
    const resp = await ServicesCommands.getCommands(query);

    // Fill with property active
    resp.data.map(item => {
      item.active = false;
    });

    // 2º Calculate and build pagination
    let pagination = [] as typePagination[];
    const round = Math.ceil(resp.total / resp.limitPage);
    let maxPagination = 0;
    if(round < 5){
      maxPagination = round;
    }else{
      maxPagination = 5;
    }
    pagination = state.pagination.slice (0, maxPagination).map(i => {
      if(i.index === resp.page - 1){
        i.active = true;
      }else{
        i.active = false;
      } 
      return i;
    });
    setState(prevState => ({ ...prevState, commands: resp, pagination, activedPage: resp.page, activeSpinner: false }));
  }

  const createPagination = () => {
    let pagination = [] as typePagination[];
    for (let i = 0; i < limitPagination; i++) {
      pagination.push({ index: i, active: false });
    }
    setState(prevState => ({ ...prevState, pagination }));
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setState(prevState => ({ ...prevState, selectedCategoryFilter: event.target.value }));
  }
;
  /**
   * Always one checkBox is actived at least
   * @param param0 
   */
  const handleChangeCheckbox = ( {target}: ChangeEvent<HTMLInputElement>) => {
    if(state.checkCommandAndMenaning && target.name === "checkCommandAndMenaning") return;

    if(state.checkCommands && target.name === "checkCommands") return;
    
    if(state.checkMeaning && target.name === "checkMeaning") return;

    if(target.name === "checkCommandAndMenaning"){
      setState(prevState => ({ ...prevState, [target.name]: target.checked, checkCommands: false, checkMeaning: false }));
    }else if(target.name === "checkCommands"){
      setState(prevState => ({ ...prevState, [target.name]: target.checked, checkCommandAndMenaning: false, checkMeaning: false }));
    }else if(target.name === "checkMeaning"){
      setState(prevState => ({ ...prevState, [target.name]: target.checked, checkCommandAndMenaning: false, checkCommands: false }));
    }
  }

  /**
   * Update command in property command of StateInitial
   * @param {string} property It can be command, es or en
   */
  const onChangeCommand = (value: any, viewUpdate: any, selectedItem: CommandData, property: string) => {
    const updatedCommands = state.commands.data.map(item => {
      if(selectedItem._id === item._id){
        // @ts-ignore
        item[property] = value;
      }
      return item;
    });
    const newCommands = {
      ...state.commands,
      data:updatedCommands
    }
    setState(prevState => ({ ...prevState, commands: newCommands }));
  };

  const handleSearchCommand = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, selectedSearchCommandFilter: target.value }));
  }

  const searchCommands = (page: number = 1)  => {
    // Prepare query
    const {selectedSearchCommandFilter, selectedCategoryFilter, 
    checkCommandAndMenaning, checkCommands, checkMeaning} = state;
    const query: any = {}

    if(checkCommandAndMenaning){
      query.command = selectedSearchCommandFilter;
      query.meaning = selectedSearchCommandFilter;
    }else if (checkCommands){
      query.command = selectedSearchCommandFilter;
    }else if (checkMeaning){
      query.meaning = selectedSearchCommandFilter;
    }

    getCommands({
      page,
      category: selectedCategoryFilter? selectedCategoryFilter : "all",
      ...query
    });
  }

  ///////////
  // Commands
  ///////////
  const openConfirmDeleteCommand  = (clickedItem: CommandData) => {
    setState(prevState => ({ ...prevState, selectedCommand: clickedItem, openModalDelete: true }));
  }

  const copyText = (clickedItem: CommandData, property: string) => {
    // @ts-ignore
    navigator.clipboard.writeText(clickedItem[property]);
  }

  ///////////////////////
  // Modal delete command
  ///////////////////////
  const handleCloseModalDelete = () => {
    setState(prevState => ({ ...prevState, openModalDelete: false }));
  }

  const deleteCommand =  async () => {
    await ServicesCommands.deleteCommand(state.selectedCommand.categoryFather._id, state.selectedCommand._id);
    // Active toastify
    toast.success("Deleted command sucessfully", {
      position: toast.POSITION.BOTTOM_LEFT
    });

    searchCommands();
    handleCloseModalDelete();
  }

  const handleBtnPagination = (item: typePagination) => {
    searchCommands(item.index + 1);
  }

  const handleBtnMorePages = (more: number) => {
    const cleanedpagination = state.pagination.map(e => {
      e.active = false;
      e.index += more;
      return e;
    });
    const newPagination = cleanedpagination.map( i => {
      if(i.index === state.activedPage - 1){
        i.active = true;
      }
      return i;
    });
    setState(prevState => ({ ...prevState, pagination: newPagination }));
  }

  return (
    <div className='mc-container-page'>
      {/* Filters */}
      <div className='mc-container-box'>
        
        <TextField id="search-command" size='small' label="Search" color="secondary"
          variant="outlined" style={{ width: 300 }}
          onChange={handleSearchCommand}
        />
        
        <FormControl size="small" style={{ width: 300 }}>
          <InputLabel
            id="select-categories"
          >
            Categories
          </InputLabel>
          <Select
            labelId="select-categories"
            id="demo-simple-select"
            value={state.selectedCategoryFilter}
            label="Categories"
            onChange={handleChangeSelect}
          >
            {state.categories.data?.map( category => (
              <MenuItem key={category._id} value={category._id}>{parseVersion(category)}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          className='mc-label'
          label="Command && Meaning"
          control={
            <Checkbox
              checked={state.checkCommandAndMenaning}
              onChange={ event => handleChangeCheckbox(event)}
              inputProps={{ 'aria-label': 'controlled' }}
              color="secondary"
              name="checkCommandAndMenaning"
            />
          }
        />

        <FormControlLabel
          className='mc-label'
          label="Command"
          control={
            <Checkbox
              checked={state.checkCommands}
              onChange={ event => handleChangeCheckbox(event)}
              inputProps={{ 'aria-label': 'controlled' }}
              color="secondary"
              name="checkCommands"
            />
          }
        />

        <FormControlLabel
          className='mc-label'
          label="Meaning"
          control={
            <Checkbox
              checked={state.checkMeaning}
              onChange={ event => handleChangeCheckbox(event)}
              inputProps={{ 'aria-label': 'controlled' }}
              color="secondary"
              name="checkMeaning"
            />
          }
        />

        <Button variant="contained" color="secondary" style={{ minWidth: 50 }}
          onClick={() => searchCommands()}
        >
          <SearchIcon fontSize="small"/>
        </Button>
      </div>

      <ModalCreateCommand getCommands={searchCommands}/>

      <Spinner active={state.activeSpinner} big>
        {/* List of commands */}
        <div className='mc-container-commands'>
          {/* Info of results */}
          <p className='mc-container-commands__info-results'>
            {state.commands.total} commands
          </p>

          {state.commands.data?.map(item => (
            <div className='mc-container-row' key={item._id}>

              {/* Options */}
              <div className='mc-container-commands__options mc-code-style'>
                
                {/* <Button variant="contained" color='secondary' size='small' style={{ minWidth: 40, width: 40 }}>
                  <ContentCopyIcon fontSize="small"/>
                </Button>

                <Button variant="contained" color='secondary' size='small' style={{ minWidth: 40, width: 40 }}>
                  <CodeIcon fontSize="small"/>
                </Button> */}
                <ModalEditCommand getCommands={searchCommands} item={item}/>


                <Button variant="contained" color='secondary' size='small'
                  style={{ minWidth: 40, width: 40 }}
                  disabled={state.user?.role === "GUEST" || item.owner !== state.user?._id }

                  onClick={() => openConfirmDeleteCommand(item)}
                >
                  <DeleteForeverIcon fontSize="small"/>
                </Button>
              </div>
                
              {/* Code */}
              <div style={{ maxWidth: "90vw" }}>
                <div className='mc-container-command'>
                  <span>
                    <Button variant="contained" color='secondary' size='small' style={{ minWidth: 40, width: 40 }}
                        onClick={() => copyText(item, "command")}
                    >
                      <ContentCopyIcon fontSize="small"/>
                    </Button>
                  </span>
                  <CodeMirror
                    value={item.command}
                    height="150px"
                    maxHeight='150px'

                    // @ts-ignore
                    extensions={[loadLanguage("sql")]}
                    theme={xcodeDark}
                    onChange={(value, viewUpdate) => onChangeCommand(value, viewUpdate, item, "command")}
                    editable={item.active}
                    className='mc-container-commands__command mc-code-style'
                  />
                </div>
                <div className='mc-container-commands__meanings'>
                  <div className='mc-container-command'>
                    <span>
                      <Button variant="contained" color='secondary' size='small' style={{ minWidth: 40, width: 40 }}
                        onClick={() => copyText(item, "en")}
                      >
                        <ContentCopyIcon fontSize="small"/>
                      </Button>
                    </span>
                    <CodeMirror
                      value={item.en}
                      height="150px"
                      maxHeight='150px'

                      // @ts-ignore
                      extensions={[loadLanguage("sql")]}
                      theme={xcodeDark}
                      onChange={(value, viewUpdate) => onChangeCommand(value, viewUpdate, item, "en")}
                      editable={item.active}
                      className='mc-code-style'
                    />
                  </div>
                  <div className='mc-container-command'>
                    <span>
                      <Button variant="contained" color='secondary' size='small' style={{ minWidth: 40, width: 40 }}
                        onClick={() => copyText(item, "es")}
                      >
                        <ContentCopyIcon fontSize="small"/>
                      </Button>
                    </span>
                    <CodeMirror
                      value={item.es}
                      height="150px"
                      maxHeight='150px'
                      // @ts-ignore
                      extensions={[loadLanguage("sql")]}
                      theme={xcodeDark}
                      onChange={(value, viewUpdate) => onChangeCommand(value, viewUpdate, item, "es")}
                      editable={item.active}
                      className='mc-code-style'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className='mc-container-pagination'>
            {state.pagination[0]?.index !== 0 && (
              <button
                onClick={() => handleBtnMorePages(-1)}
              >
                {"<"}
              </button>
            )}
            
            {state.pagination.map(item => (
              <button
                className={item.active? "mc-container-pagination__selected" : ""}
                onClick={() => handleBtnPagination(item)}
                key={item.index.toString()}
              >
                {item.index + 1}
              </button>
            ))}
            
            {state.pagination[state.pagination.length - 1]?.index + 1 !== state.commands.pages && (
              <button
                onClick={() => handleBtnMorePages(1)}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      </Spinner>

      {/* Modal: delete command */}
      <ModalConfirmDelete
          open={state.openModalDelete}
          onClose={handleCloseModalDelete}
          ariaLabelledby="modal-modal-title-delete"
          ariaDescribedby="modal-modal-description-delete"
          title={`Delete command`}
          message="Are you sure you want to delete this command"
          deleteItem={deleteCommand}
      />
    </div>
  )
}