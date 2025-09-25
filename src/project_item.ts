import { Component } from "./component.js";
import { Project } from "./project.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, project.id);

        this.configure();
        this.renderContent();
        this.attach('afterbegin');
    }

    protected configure() { };
    protected renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.numberOfPeople.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    };
}