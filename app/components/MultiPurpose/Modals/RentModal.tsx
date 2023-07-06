"use client";
import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Modal } from "./Modal";
import { Heading } from "../Heading";
import { useRentModal } from "@/app/helpers/hooks/useRentModal";
import { categories } from "../../Navbar/Categories";
import { CategoryInput } from "../Inputs/CategoryInput";
import { CountrySelect } from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import { Counter } from "../Inputs/Counter";

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
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../../Map"), {
        ssr: false,
      }),
    [location]
  );

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
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located"
          subTitle="Help guests to find you!"
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === Steps.Info) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subTitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subTitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
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
