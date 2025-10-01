import { validate, Validatable } from './validation.js';
import { autobind } from './decorators.js';
import { projectState, ProjectData } from './project_state.js';
import { Component } from './component.js';

export class ProjectInput extends Component<HTMLFormElement, HTMLDivElement> {
    private readonly titleInputElement: HTMLInputElement;
    private readonly descriptionInputElement: HTMLInputElement;
    private readonly peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    }

    protected configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    protected renderContent() { }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherUserInput();
        if (userInput) {
            projectState.addProject(userInput);
            this.clearInputs();
        }
    }

    private gatherUserInput(): ProjectData | void {
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = +this.peopleInputElement.value;


        const errors = this.validateInputs(enteredTitle, enteredDescription, enteredPeople);

        if (errors && errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        return { title: enteredTitle, description: enteredDescription, numberOfPeople: enteredPeople };
    }

    private validateInputs(enteredTitle: string, enteredDescription: string, enteredPeople: number): string[] {
        const validatableTitle: Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 2,
            maxLength: 100,
        }

        const validatableDescription: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 500,
        }

        const validatablePeople: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        const errors: string[] = [];

        const titleError = validate(validatableTitle);
        if (!titleError.success) errors.push(`Title: ${titleError.error}`);

        const descriptionError = validate(validatableDescription);
        if (!descriptionError.success) errors.push(`Description: ${descriptionError.error}`);

        const peopleError = validate(validatablePeople);
        if (!peopleError.success) errors.push(`People: ${peopleError.error}`);

        return errors;
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}