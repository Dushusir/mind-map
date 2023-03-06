export class ComponentFactory {
    static build(key, id) {
        const create = ComponentFactory.register.get(key);
        if (create) {
            return create(id);
        }
    }
}

ComponentFactory.id = 0;
ComponentFactory.register = new Map();
