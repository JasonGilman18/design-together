export default class Stack<T> {
    items: T[];

    public constructor() {
        this.items = [];
    }

    public peek() {
        return this.items[this.items.length-1];
    }

    public push(element: T) {
        this.items.push(element);
    }

    public pop() {
        const element = this.items.splice(this.items.length-1)[0];
        return element;
    }

    public empty() {
        return this.items.length === 0;
    }
}