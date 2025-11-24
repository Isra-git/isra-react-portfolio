import {
  faTrash,
  faSignOutAlt,
  faEdit,
  faSpinner,
  faPlusCircle,
  faBlog,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
  return library.add(faTrash, faBlog, faSignOutAlt, faEdit, faSpinner, faPlusCircle);
};

export default Icons;
