import { validate, Validatable } from './validation.js';
import { autobind } from './decorators.js';
import { projectState } from './project_state.js';
import { Component } from './component.js';

export class ProjectInput extends Component<HTMLFormElement, HTMLDivElement> {
    private readonly titleInputElement: HTMLInputElement;
    private readonly descriptionInputElement: HTMLInputElement;
    private readonly peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach('afterbegin');
    }

    protected configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    protected renderContent() { }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            projectState.addProject({
                title: userInput[0],
                description: userInput[1],
                numberOfPeople: userInput[2]
            });
            this.clearInputs();
        }
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = +this.peopleInputElement.value;

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

        if (!validate(validatableTitle)
            || !validate(validatableDescription)
            || !validate(validatablePeople)) {
            alert('Invalid data!');
            return;
        }

        return [enteredTitle, enteredDescription, enteredPeople];
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}