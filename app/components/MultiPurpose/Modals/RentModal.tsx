"use client";
import React from "react";
import axios from "axios";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRegisterModal } from "@/app/helpers/hooks/useRegisterModal";
import { useLoginModal } from "@/app/helpers/hooks/useLoginModal";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { Input } from "../Inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRentModal } from "@/app/helpers/hooks/useRentModal";
import { categories } from "../../Navbar/Categories";
import { CategoryInput } from "../Inputs/CategoryInput";

enum Steps {
  Category = 0,
  Location,
  Info,
  Images,
  Description,
  Price,
}

export const RentModal = () => {
  const [step, setStep] = React.useState(Steps.Category);

  const rentModal = useRentModal();

  const onBack = () => {
    setStep((prev) => prev - 1);
  };
  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = React.useMemo(() => {
    if (step === Steps.Price) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === Steps.Category) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue, // Does not rerender component
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((c) => (
          <div key={c.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              label={c.label}
              icon={c.icon}
              selected={category === c.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === Steps.Location) {
    body = <div>Location</div>;
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Rent"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.Category ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      body={body}
    />
  );
};
