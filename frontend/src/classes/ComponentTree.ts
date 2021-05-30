import Component from "./Component";

export default class ComponentTree {
    root: Component | null;
    components: Component[];

    public constructor() {
        this.root = null;
        this.components = [];
    }

    public insert(component: Component) {
        if(this.root === null)
            this.root = component;
        else if(component.node.parent !== null) {
            const parentComponent = this.find(component.node.parent.id);
            parentComponent?.addChild(component);
        }
        this.components.push(component);
    }

    public find(id: number | null): Component | null {
        var found = null;
        this.components.forEach((component) => {
            if(component.id === id)
                found = component;
        });
        return found;
    }

    public remove(id: number) {
        const component = this.find(id);
        component?.node.parent?.removeChild(component);
        this.components.forEach((cmp, index) => {
            if(cmp.id === id)
                this.components.splice(index);
        });
    }

    public copy(): ComponentTree {
        const newTree = new ComponentTree();
        newTree.root = this.root;
        newTree.components = [...this.components];
        return newTree;
    }
}