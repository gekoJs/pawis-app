import { type_formComponentInputError } from "@/utils/types/types";
export const handleFormErrors = ({
  breed,
  height_min,
  height_max,
  weight_min,
  weight_max,
  lifeTime_min,
  lifeTime_max,
  image,
  temperament,
}: any) => {
  let errors: type_formComponentInputError = {};

  //bREED VALIDATIONS---------------------------------
  if (!breed) errors.breed = "Breed is missing";
  else if (/[0-9]+/i.test(breed)) errors.breed = "Numbers are not allowed";
  else if (/[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]/.test(breed))
    errors.breed = "Only letters allowed";
  //bREED VALIDATIONS---------------------------------

  //HEIGHT VALIDATIONS---------------------------------
  if (!height_max) errors.height_max = "Whats the minimum height?";
  else if (/[a-zA-Z]+/.test(height_max))
    errors.height_max = "Letters not allowed?";
  else if (parseInt(height_max) < parseInt(height_min))
    errors.height_max = "Max height cannot be less than min height";

  if (!height_min) errors.height_min = "Whats the maximum height?";
  else if (/[a-zA-Z]+/.test(height_min))
    errors.height_min = "Letters not allowed?";
  else if (parseInt(height_min) === 0)
    errors.height_min = "Min height cannot be 0";
  else if (parseInt(height_min) > parseInt(height_max))
    errors.height_min = "Min height cannot be greater than min height";
  //HEIGHT VALIDATIONS---------------------------------

  //WEIGHT VALIDATIONS---------------------------------
  if (!weight_max) errors.weight_max = "Whats the minimum weight?";
  else if (/[a-zA-Z]+/.test(weight_max))
    errors.weight_max = "Letters not allowed?";
  else if (parseInt(weight_max) < parseInt(weight_min))
    errors.weight_max = "Max weight cannot be less than min weight";

  if (!weight_min) errors.weight_min = "Whats the maximum weight?";
  else if (/[a-zA-Z]+/.test(weight_min))
    errors.weight_min = "Letters not allowed?";
  else if (parseInt(weight_min) === 0)
    errors.weight_min = "Min weight cannot be 0";
  else if (parseInt(weight_min) > parseInt(weight_max))
    errors.weight_min = "Min weight cannot be greater than min weight";
  //WEIGHT VALIDATIONS---------------------------------

  //LIFETIME VALIDATIONS---------------------------------
  if (!lifeTime_max) errors.lifeTime_max = "Whats the minimum Life Time?";
  else if (/[a-zA-Z]+/.test(lifeTime_max))
    errors.lifeTime_max = "Letters not allowed?";
  else if (parseInt(lifeTime_max) < parseInt(lifeTime_min))
    errors.lifeTime_max = "Max lifetime cannot be less than min lifetime";

  if (!lifeTime_min) errors.lifeTime_min = "Whats the maximum Life Time?";
  else if (/[a-zA-Z]+/.test(lifeTime_min))
    errors.lifeTime_min = "Letters not allowed?";
  else if (parseInt(lifeTime_min) === 0)
    errors.lifeTime_min = "Min lifetime cannot be 0";
  else if (parseInt(lifeTime_min) > parseInt(lifeTime_max))
    errors.lifeTime_min = "Min lifetime cannot be greater than min lifetime";
  //LIFETIME VALIDATIONS---------------------------------

  //iMAGE VALIDATIONS------------------------------------
  if (!image) {
  } else if (
    !/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9]+(?:[\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?$/i.test(
      image
    )
  )
    errors.image = "We need an image URL";
  //iMAGE VALIDATIONS------------------------------------

  //tEMPERAMENT VALIDATIONS------------------------------------
  if (!!!temperament.length) errors.temperament = "temperament are needed";
  //tEMPERAMENT VALIDATIONS------------------------------------

  return errors;
};
