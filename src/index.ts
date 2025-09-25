interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(input: Validatable): boolean {
    const valueLength = input.value.toString().trim().length;
    if (input.required && valueLength === 0) {
        return false;
    }

    if (typeof input.value === 'string') {
        if (input.minLength != null && valueLength < input.minLength) {
            return false;
        }

        if (input.maxLength != null && valueLength > input.maxLength) {
            return false;
        }
    } else if (typeof input.value === 'number') {
        if (input.min != null && input.value < input.min) {
            return false;
        }

        if (input.max != null && input.value > input.max) {
            return false;
        }
    }

    return true;
}

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class ProjectInput {
    private readonly templateElement: HTMLTemplateElement;
    private readonly hostElement: HTMLDivElement;
    private readonly element: HTMLFormElement;
    private readonly titleInputElement: HTMLInputElement;
    private readonly descriptionInputElement: HTMLInputElement;
    private readonly peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }


    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            console.log(userInput);
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
            minLength: 5,
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

const projectInput = new ProjectInput();