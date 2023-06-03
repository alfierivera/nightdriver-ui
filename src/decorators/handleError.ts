export function HandleError(_target: Object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (error) {
      this.logging.error(`${propertyKey}() error: ${error.message}`, error)
      throw error;
    }
  };

  return descriptor;
}
