import { ToDoStatus, TODO_STATUS_TYPES} from './to-do-status';

export class ToDo {
    private name: string;
    private date: Date;
    private priority: number;

    constructor(name: string, date: Date, priority: number) {
        this.name = name;
        this.date = date;
        this.priority = priority;
    }

    setName(name: string): ToDo {
        this.name = name;
        return this;
    }
    getName(): string {
        return this.name;
    }

    getDate(): Date {
        return this.date;
    }
    setDate(date: Date): ToDo {
        this.date = date;
        return this;
    }

    getPriority(): number {
        return this.priority;
    }
    setPriority(priority: number): ToDo {
        this.priority = priority;
        return this;
    }

    getStatusColor(): string {
        return ToDoStatus.getColor(this.getPriority());
    }
    getStatusText(): string {
        for (const state in TODO_STATUS_TYPES) {
            if (Number(this.getPriority()) === TODO_STATUS_TYPES[state]) {
                return state;
            }
        }
    }
}
