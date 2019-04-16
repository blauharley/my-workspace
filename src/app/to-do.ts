export class ToDo {
    private name: string;
    private date: Date;
    private priority: string;

    constructor(name: string, date: Date, priority: string) {
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

    getPriority(): string {
        return this.priority;
    }
    setPriority(priority: string): ToDo {
        this.priority = priority;
        return this;
    }
}
