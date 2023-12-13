"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      outline
      label="Back"
      iconName="arrow-left-circle-line"
      type="button"
    />
  );
};

export default BackButton;
