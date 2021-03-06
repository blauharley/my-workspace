import { ToDoStatus, TODO_STATUS_TYPES} from './to-do-status';

export class ToDo {

    private id: number;
    private name: string;
    private date: Date;
    private priority: number;
    private moveState: string;

    constructor(data: object=null) {
        this.id = data && data['id'] ? Number(data['id']) : -1;
        this.name = data && data['name'] ? data['name'].toString() : '';
        this.date = data && data['date'] instanceof Date ? data['date'] : new Date();
        this.priority = data && [1,0,-1].includes(+data['priority']) ? +data['priority'] : -1;
        this.moveState = 'out';
    }

    getID(): number {
        return this.id;
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

    getMoveState(): string {
        return this.moveState;
    }

    setMoveState(value: string): ToDo {
        this.moveState = value;
        return this;
    }

    /**
     * @return { id: string, name: string, date: number, priority: string }
     */
    toJSON(): object {
        return {
            id : this.id,
            name : this.name,
            date : this.date.getTime()/1000,
            priority : this.priority
        };
    }
}
