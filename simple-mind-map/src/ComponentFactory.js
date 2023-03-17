export class ComponentFactory {
    static build(key, id,attr) {
        const create = ComponentFactory.register.get(key);
        if (create) {
            return create(id,attr);
        }
    }
}

ComponentFactory.id = 0;
ComponentFactory.register = new Map();
