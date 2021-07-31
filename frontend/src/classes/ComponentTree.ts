import Component from "./Component";
import {ComponentData} from "./Component";

export default class ComponentTree {
    root: Component | null;
    components: Component[];

    public constructor() {
        this.root = null;
        this.components = [];
    }

    public static loadDocument(componentDataList: ComponentData[]) {
        var newTree: ComponentTree = new ComponentTree();
        this.loadComponents(newTree, componentDataList, null);
        return newTree;
    }

    private static loadComponents(newTree: ComponentTree, componentDataList: ComponentData[], parent_id: number | null
    ) {
        if(parent_id === null) {
            componentDataList.map((componentData) => {
                if(componentData.parent_id === null) {
                    newTree.insert(new Component(componentData.id, componentData.document_id,
                        null, componentData.type, componentData
                    ));
                    this.loadComponents(newTree, componentDataList, componentData.id);
                }
            });
        }
        else {
            var childrenComponentData: ComponentData[] = [];
            var parentComponent = newTree.find(parent_id);
            componentDataList.map((componentData) => {
                if(componentData.parent_id === parent_id) {
                    childrenComponentData.push(componentData);
                    this.loadComponents(newTree, componentDataList, componentData.id);
                }
            });
            childrenComponentData.sort((a, b) => a.id - b.id);
            childrenComponentData.map((childData) => {
                newTree.insert(new Component(childData.id, childData.document_id, parentComponent, childData.type, childData));
            });
        }
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