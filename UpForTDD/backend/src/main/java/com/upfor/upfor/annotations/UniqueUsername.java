package com.upfor.upfor.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.upfor.upfor.validations.UniqueUsernameValidator;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target(ElementType.FIELD) //Plave where we want to use the annotation. In this case in the username field
@Retention(RetentionPolicy.RUNTIME) //Annotation to be processed in runtime
public @interface UniqueUsername {

    //Bean Validation Specification
    String message() default "{upfor.constraints.username.UniqueUsername.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };

}
