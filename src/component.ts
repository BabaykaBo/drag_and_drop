export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected readonly templateElement: HTMLTemplateElement;
    protected readonly hostElement: U;
    protected readonly element: T;

    constructor(templateId: string, hostElementId: string, insertPosition: InsertPosition, elementId?: string, renderData: any[] = []) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as U;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as T;
        if (elementId) this.element.id = elementId;

        this.configure();
        this.renderContent(...renderData);
        this.attach(insertPosition);
    }

    private attach(where: InsertPosition) {
        this.hostElement.insertAdjacentElement(where, this.element);
    }

    protected abstract configure(): void;
    protected abstract renderContent(...args: any[]): void;
}