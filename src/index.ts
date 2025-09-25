import { ProjectInput } from './project_input.js';
import { ProjectList } from './project_list.js';


const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');