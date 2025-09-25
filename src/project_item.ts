import { Component } from "./component.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    constructor(hostId: string) {
        super('single-project', hostId);
    }
}