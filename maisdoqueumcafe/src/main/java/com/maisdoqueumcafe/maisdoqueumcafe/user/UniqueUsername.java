package com.maisdoqueumcafe.maisdoqueumcafe.user;

import javax.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueUsernameValidator.class) // Looks for the valiation implementation
@Target(ElementType.FIELD) // Defines where the unique username annotation can be used
@Retention(RetentionPolicy.RUNTIME) // Tells JVM to let our annotation to be processed in runtime
public @interface UniqueUsername {
    java.lang.String message() default "{maisdoqueumcafe.constraints.username.UniqueUsername.message}";

    java.lang.Class<?>[] groups() default {};

    java.lang.Class<? extends javax.validation.Payload>[] payload() default {};
}
