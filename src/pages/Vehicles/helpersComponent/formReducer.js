export const initialState = {
  formData: {
    carModel: "",
    features: {
      airConditioning: false,
      automaticTransmission: false,
      petrol: false,
      withDriver: false,
    },
    capacity: {
      passengers: "",
      suitcases: "",
      mileageLimit: "",
    },
    pricing: {
      pricePerDay: "",
      discountPrice: "",
    },
    dealIncludes: {
      freeCancellation: false,
      theftProtection: false,
      fairFuelPolicy: false,
      freeCollisionWaiver: false,
      unlimitedMileage: false,
    },
  },
  uploadedImage: null,
  isDragOver: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      if (action.payload.section) {
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.payload.section]: {
              ...state.formData[action.payload.section],
              [action.payload.field]: action.payload.value,
            },
          },
        };
      } else {
        return {
          ...state,
          formData: {
            ...state.formData,
            [action.payload.field]: action.payload.value,
          },
        };
      }

    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.section]: {
            ...state.formData[action.payload.section],
            [action.payload.field]:
              !state.formData[action.payload.section][action.payload.field],
          },
        },
      };

    case "SET_IMAGE":
      return {
        ...state,
        uploadedImage: action.payload,
      };

    case "SET_DRAG_OVER":
      return {
        ...state,
        isDragOver: action.payload,
      };

    default:
      return state;
  }
};
