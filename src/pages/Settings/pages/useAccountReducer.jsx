import { useReducer } from "react";

const initialState = {
  formData: {
    companyName: "",
    phoneNumber: "",
    aboutCompany: "",
    services: {
      insurance: false,
      driverOptions: false,
      roadsideAssistance: false,
      specialDeals: false,
      ecoFriendly: false,
      mileageOptions: false,
      discountsLoyalty: false,
      longDistanceRentals: false,
    },
  },
  uploadedLogo: null,
  isDragOver: false,
  documents: {
    vat: null,
    commercial: null,
    contract: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
      };
    case "TOGGLE_SERVICE":
      return {
        ...state,
        formData: {
          ...state.formData,
          services: {
            ...state.formData.services,
            [action.payload]: !state.formData.services[action.payload],
          },
        },
      };
    case "SET_DRAG_OVER":
      return {
        ...state,
        isDragOver: action.payload,
      };
    case "UPLOAD_LOGO":
      return {
        ...state,
        uploadedLogo: action.payload,
      };
    case "REMOVE_LOGO":
      return {
        ...state,
        uploadedLogo: null,
      };
    case "UPLOAD_DOCUMENT":
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.payload.documentType]: {
            file: action.payload.file,
            fileName: action.payload.fileName,
          },
        },
      };
    case "REMOVE_DOCUMENT":
      return {
        ...state,
        documents: {
          ...state.documents,
          [action.payload]: null,
        },
      };
    default:
      return state;
  }
};

export const useAccountReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};
