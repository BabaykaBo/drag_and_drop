type ProjectData = { title: string, description: string, numberOfPeople: number };

class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    addProject(projectData: ProjectData) {
        const newProject = {
            id: Math.random().toString(),
            ...projectData
        }

        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
    }
}

export const projectState = ProjectState.getInstance();