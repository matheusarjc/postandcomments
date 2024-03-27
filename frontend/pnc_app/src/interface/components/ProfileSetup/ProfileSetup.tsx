import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProfilePictureUploader from "../../partials/ProfilePictureUploader";

export interface ProfileFormData {
  bio: string;
  personalLink: string;
}

interface ProfileSetupProps {
  onSubmit: (data: ProfileFormData, photo: File | null) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const handleFormSubmit = (data: ProfileFormData) => {
    onSubmit(data, selectedPhoto);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Profile Photo */}
      <ProfilePictureUploader onImageSelected={setSelectedPhoto} />

      {/* Outros campos do formulário */}
      <textarea {...register("bio", { required: "Bio is required" })} />
      {errors.bio && <p>{errors.bio.message}</p>}

      <input
        type="text"
        {...register("personalLink", {
          required: "Link is required",
          pattern: {
            value: /^(https?:\/\/)?([\w\d.-]+)\.([\w\d]{2,6})([\/\w .-]*)*\/?$/,
            message: "Invalid URL",
          },
        })}
      />
      {errors.personalLink && <p>{errors.personalLink.message}</p>}

      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfileSetup;
