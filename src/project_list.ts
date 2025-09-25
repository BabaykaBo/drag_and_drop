type ProjectType = 'active' | 'finished';
type ProjectListIdType = `${ProjectType}-projects`;
type ProjectIdType = `${ProjectType}-project`;

export class ProjectList {
    private readonly templateElement: HTMLTemplateElement;
    private readonly hostElement: HTMLDivElement;
    private readonly element: HTMLElement;
    private type: ProjectType;

    constructor(type: ProjectType) {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        this.type = type;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;

        const id: ProjectListIdType = `${this.type}-projects`;
        this.element.id = id;

        this.attach();
        this.renderContent();
    }

    private renderContent() {
        const listId: ProjectIdType = `${this.type}-project`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}