const COLORS: object = {
    1 : 'red',
    0 : 'yellow',
    '-1' : 'green'
};

export const TODO_STATUS_TYPES: object =  {
    HIGH : 1,
    MIDDLE : 0,
    LOW : -1
};

export class ToDoStatus {
    static getColor(typeNumber: number): string {
        return COLORS[typeNumber];
    }
}

