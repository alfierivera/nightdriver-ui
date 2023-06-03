export function LogExecutionTime(
    _target: Object, 
    propertyKey: string, 
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
  
    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
  
      const result = await originalMethod.apply(this, args);
  
      const end = performance.now();
  
      this.logging.trace(`${propertyKey}: OK ${end - start} ms`);
  
      return result;
    };
  
    return descriptor;
  }
  