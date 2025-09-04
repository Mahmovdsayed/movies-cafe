'use client'

import { OTPVerify, requestNewOTP } from "@/app/actions/auth/verify.action";
import { AddToast } from "@/functions/AddToast";
import { triggerConfetti } from "@/helpers/ConfettiFireworks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FormMotion from "../motion/FormMotion";
import { Button, InputOtp } from "@heroui/react";
import SubmitButton from "../ui/SubmitButton";
import { MdRefresh, MdVerified } from "react-icons/md";

const OtpVerifyForm = () => {
    const [value, setValue] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    const [loading, setLoading] = useState(false);
    const [reloading, setreLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await OTPVerify(value, email)
        if (res.success) {
            setLoading(false)
            AddToast(
                res.message,
                5000,
                "success"
            )
            triggerConfetti()
            setTimeout(() => {
                router.push(`/auth/signin`);
            }, 2000);
        } else {
            setLoading(false)
            AddToast(
                res.message,
                5000,
                "danger"
            )
        }
    }

    const resendOTP = async () => {
        setreLoading(true);
        const res = await requestNewOTP(email)
        if (res.success) {
            setreLoading(false)
            AddToast(
                res.message,
                5000,
                "success"
            )
        } else {
            setreLoading(false)
            AddToast(
                res.message,
                5000,
                "danger"
            )
        }
    }
    return <>
        <div className="mt-4 w-full text-start lg:w-9/12">
            <form
                onSubmit={handleSubmit}
            >
                <FormMotion delay={0.4}>
                    <InputOtp
                        variant="bordered"
                        size="lg"
                        description="Enter the 6-digit code we sent to your email address."
                        textAlign="center"
                        length={6}
                        isRequired
                        className="flex items-center justify-center w-full font-medium md:block"
                        value={value}
                        onValueChange={setValue}
                    />
                </FormMotion>

                <div className="mt-4 flex flex-col md:flex-row gap-3 md:gap-4">
                    <FormMotion delay={0.5}>
                        <SubmitButton
                            title="Verify"
                            isLoading={loading}
                            isDisabled={loading}
                            startContent={<MdVerified />}
                        />
                    </FormMotion>
                    <FormMotion delay={0.6}>
                        <Button
                            radius="full"
                            isLoading={reloading}
                            isDisabled={reloading}
                            variant="bordered"
                            className="w-full md:bg-transparent  p-0"
                            type="button"
                            onPress={() => resendOTP()}
                            startContent={<MdRefresh />}
                        >
                            Request New OTP
                        </Button>
                    </FormMotion>
                </div>
            </form>
        </div>
    </>;
};

export default OtpVerifyForm;