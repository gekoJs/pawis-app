interface type_inpStateErr {
  Breed?: string;
  Height_min?: string;
  Height_max?: string;
  Weight_min?: string;
  Weight_max?: string;
  LifeTime_min?: string;
  LifeTime_max?: string;
  Image?: string;
  Temperaments?: string;
}
export const handleFormErrors = ({
  Breed,
  Height_min,
  Height_max,
  Weight_min,
  Weight_max,
  LifeTime_min,
  LifeTime_max,
  Image,
  Temperaments,
}: any) => {
  let errors: type_inpStateErr = {};

  //BREED VALIDATIONS---------------------------------
  if (!Breed) errors.Breed = "Breed is missing";
  else if (/[0-9]+/i.test(Breed)) errors.Breed = "Numbers are not allowed";
  else if (/[-!$%^&*()_+|~=`{}\[\]:\";'<>?,.\/]/.test(Breed))
    errors.Breed = "Only letters allowed";
  //BREED VALIDATIONS---------------------------------

  //HEIGHT VALIDATIONS---------------------------------
  if (!Height_max) errors.Height_max = "Whats the minimum height?";
  else if (/[a-zA-Z]+/.test(Height_max))
    errors.Height_max = "Letters not allowed?";
  else if (parseInt(Height_max) < parseInt(Height_min))
    errors.Height_max = "Max height cannot be less than min height";

  if (!Height_min) errors.Height_min = "Whats the maximum height?";
  else if (/[a-zA-Z]+/.test(Height_min))
    errors.Height_min = "Letters not allowed?";
  else if (parseInt(Height_min) === 0)
    errors.Height_min = "Min height cannot be 0";
  else if (parseInt(Height_min) > parseInt(Height_max))
    errors.Height_min = "Min height cannot be greater than min height";
  //HEIGHT VALIDATIONS---------------------------------

  //WEIGHT VALIDATIONS---------------------------------
  if (!Weight_max) errors.Weight_max = "Whats the minimum weight?";
  else if (/[a-zA-Z]+/.test(Weight_max))
    errors.Weight_max = "Letters not allowed?";
  else if (parseInt(Weight_max) < parseInt(Weight_min))
    errors.Weight_max = "Max weight cannot be less than min weight";

  if (!Weight_min) errors.Weight_min = "Whats the maximum weight?";
  else if (/[a-zA-Z]+/.test(Weight_min))
    errors.Weight_min = "Letters not allowed?";
  else if (parseInt(Weight_min) === 0)
    errors.Weight_min = "Min weight cannot be 0";
  else if (parseInt(Weight_min) > parseInt(Weight_max))
    errors.Weight_min = "Min weight cannot be greater than min weight";
  //WEIGHT VALIDATIONS---------------------------------

  //LIFETIME VALIDATIONS---------------------------------
  if (!LifeTime_max) errors.LifeTime_max = "Whats the minimum Life Time?";
  else if (/[a-zA-Z]+/.test(LifeTime_max))
    errors.LifeTime_max = "Letters not allowed?";
  else if (parseInt(LifeTime_max) < parseInt(LifeTime_min))
    errors.LifeTime_max = "Max lifetime cannot be less than min lifetime";

  if (!LifeTime_min) errors.LifeTime_min = "Whats the maximum Life Time?";
  else if (/[a-zA-Z]+/.test(LifeTime_min))
    errors.LifeTime_min = "Letters not allowed?";
  else if (parseInt(LifeTime_min) === 0)
    errors.LifeTime_min = "Min lifetime cannot be 0";
  else if (parseInt(LifeTime_min) > parseInt(LifeTime_max))
    errors.LifeTime_min = "Min lifetime cannot be greater than min lifetime";
  //LIFETIME VALIDATIONS---------------------------------

  //IMAGE VALIDATIONS------------------------------------
  if (!Image) {
  } else if (
    !/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9]+(?:[\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?$/i.test(
      Image
    )
  )
    errors.Image = "We need an image URL";
  //IMAGE VALIDATIONS------------------------------------

  //TEMPERAMENTS VALIDATIONS------------------------------------
  if (!!!Temperaments.length) errors.Temperaments = "Temperaments are needed";
  //TEMPERAMENTS VALIDATIONS------------------------------------

  return errors;
};
