import { Component } from "./component.js";
import { Project } from "./project.js";
import { Draggable } from "./drag_drop.js";
import { autobind } from "./decorators.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(hostId: string, private project: Project) {
        super('single-project', hostId, 'afterbegin', project.id, [project]);
        this.element.draggable = true;
    }

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(_: DragEvent): void {
        console.log('Drag End');
    }

    protected configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    };

    protected renderContent(project: Project) {
        this.element.querySelector('h2')!.textContent = project.title;
        this.element.querySelector('h3')!.textContent = `${project.numberOfPeople.toString()} Person${project.numberOfPeople === 1 ? '' : 's'} assigned`;
        this.element.querySelector('p')!.textContent = project.description;
    };
}