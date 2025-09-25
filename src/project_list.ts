import { projectState } from './project_state.js';
import { Project, ProjectStatus } from './project.js';
import { Component } from './component.js';
import { ProjectItem } from './project_item.js';

type ProjectType = 'active' | 'finished';
type ProjectListIdType = `${ProjectType}-projects-list`;
type ProjectIdType = `${ProjectType}-projects`;

export class ProjectList extends Component<HTMLElement, HTMLDivElement> {
    private type: ProjectType;
    private projects: Project[] = [];

    constructor(type: ProjectType) {
        const id: ProjectIdType = `${type}-projects`;
        super('project-list', 'app', id);

        this.type = type;
        this.renderContent();

        projectState.addListener((projects: Project[]) => {
            const filteredProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                } else if (this.type === 'finished') {
                    return prj.status === ProjectStatus.Finished;
                }

                return false;
            });
            this.projects = filteredProjects;
            this.renderProjects();
        });

        this.attach('beforeend');
    }

    protected renderContent() {
        const listId: ProjectListIdType = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    protected configure() { };

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
        listEl.innerHTML = '';

        for (const project of this.projects) {
            new ProjectItem(listEl.id, project);
        }
    }
}