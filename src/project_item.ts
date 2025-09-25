import { Component } from "./component.js";
import { Project } from "./project.js";
import { Draggable } from "./drag_drop.js";
import { autobind } from "./decorators.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, project.id);

        this.configure();
        this.renderContent();
        this.attach('afterbegin');
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        console.log(event);
    }

    @autobind
    dragEndHandler(event: DragEvent): void {
        console.log(event);
    }

    protected configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    };

    protected renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = `${this.project.numberOfPeople.toString()} Person${this.project.numberOfPeople === 1 ? '' : 's'} assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;
    };
}