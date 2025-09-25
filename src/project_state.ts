import { Project } from "./project.js";
type ProjectData = { title: string, description: string, numberOfPeople: number };
type Listener = (items: Project[]) => void;

class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(projectData: ProjectData) {
        const newProject = new Project(
            Math.random().toString(),
            projectData.title,
            projectData.description,
            projectData.numberOfPeople
        );

        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }
}

export const projectState = ProjectState.getInstance();