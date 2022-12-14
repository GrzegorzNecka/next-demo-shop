import { Main } from "components/main";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "components/forms/form-input";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const SignupPage = () => {
    const session = useSession();

    const router = useRouter();

    if (session.status === "authenticated") {
        router.push("/");
    }

    const signUpFormSchema = yup
        .object({
            email: yup.string().required("pole jest wymagane").email(),
            password: yup.string().required("pole jest wymagane").min(3),
            passwordConfirmation: yup.string().oneOf([yup.ref("password")], "hasła muszą być takie same"),
        })
        .required();

    type SignUpFormData = yup.InferType<typeof signUpFormSchema>;

    const { register, handleSubmit, formState } = useForm<SignUpFormData>({
        resolver: yupResolver(signUpFormSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const user = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify(data),
        });

        if (user.ok) {
            signIn();
        }
    });

    return (
        <Main>
            <div className="flex flex-col md:w-full">
                <h2 className="mb-4 font-bold md:text-xl text-heading ">Rejestracja</h2>
                <form onSubmit={onSubmit} className="mx-auto max-w-md justify-center w-full">
                    <div className="mt-4">
                        <div className="w-full">
                            <FormInput type="email" placeholder="Email" name="email" useForm={{ register, formState }}>
                                Email
                            </FormInput>
                            <FormInput
                                type="password"
                                placeholder="podaj hasło"
                                name="password"
                                useForm={{ register, formState }}
                            >
                                Podaj hasło
                            </FormInput>
                            <FormInput
                                type="password"
                                placeholder="potwierdź hasło"
                                name="passwordConfirmation"
                                useForm={{ register, formState }}
                            >
                                Potwierdź hasło
                            </FormInput>
                        </div>
                    </div>

                    <button type="submit" className="mt-4 w-full btn-custom-primary">
                        rejestracja
                    </button>
                </form>
            </div>
        </Main>
    );
};

export default SignupPage;
