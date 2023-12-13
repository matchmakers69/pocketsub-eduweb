"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../buttons/Button";

const ButtonCreate = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/blog/create")}
      label="Create article"
      type="button"
    />
  );
};

export default ButtonCreate;
