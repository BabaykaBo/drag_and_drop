import { projectState } from './project_state.js';

type ProjectType = 'active' | 'finished';
type ProjectListIdType = `${ProjectType}-projects-list`;
type ProjectIdType = `${ProjectType}-projects`;

export class ProjectList {
    private readonly templateElement: HTMLTemplateElement;
    private readonly hostElement: HTMLDivElement;
    private readonly element: HTMLElement;
    private type: ProjectType;
    private projects: any[] = [];

    constructor(type: ProjectType) {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        this.type = type;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;

        const id: ProjectIdType = `${this.type}-projects`;
        this.element.id = id;

        this.renderContent();

        projectState.addListener((projects: any[]) => {
            this.projects = projects;
            this.renderProjects();
        });

        this.attach();

    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const project of this.projects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            listEl?.appendChild(listItem);
        }
    }

    private renderContent() {
        const listId: ProjectListIdType = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}