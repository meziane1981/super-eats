import { registerDecorator, ValidationOptions, ValidationArguments, Min } from 'class-validator';

function MinMax(property: number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'minMax',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log("CONSTRAINTS");
                    console.log(args.constraints);
                    
                    return typeof value == 'number'
                }
            }
        })
    }
}

export default MinMax;