import { ToDoStatus, TODO_STATUS_TYPES} from './to-do-status';

export class ToDo {
    private id: number;
    private name: string;
    private date: Date;
    private priority: number;

    constructor(data: object) {
        this.id = data['id'] ? Number(data['id']) : -1;
        this.name = data['name'] ? data['name'].toString() : '';
        this.date = data['date'] instanceof Date ? data['date'] : null;
        this.priority = data['priority'] ? Number(data['priority']) : -1;
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
    toJSON(): object {
        return {
            id : this.id,
            name : this.name,
            date : this.date.getTime()/1000,
            priority : this.priority
        };
    }
}
