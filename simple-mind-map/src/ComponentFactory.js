export class ComponentFactory {
    static build(key) {
        const create = ComponentFactory.register.get(key);
        if (create) {
            return create();
        }
    }
}

ComponentFactory.register = new Map()
