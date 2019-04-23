export class MyRegExValue{
    constructor(public pure?: string, public searchable?: string){}
}

export class MyRegEx {
    public value: MyRegExValue = new MyRegExValue();
    constructor(public name?: string, value?: { pure: string, searchable: string}){
        this.value.pure = value ? value.pure : '';
        this.value.searchable = value ? value.searchable : '';
    }
}
