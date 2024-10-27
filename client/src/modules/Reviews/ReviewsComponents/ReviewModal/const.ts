export const NAME = 'name'
export const RATING = 'rating'
export const COMMENT = 'comment'
export const IMAGES = 'images'
export const MAX_COMMENT_LENGTH = 2000
export const MAX_NAME_LENGTH = 50


export interface IValues {
    [NAME]: string,
    [RATING]: number,
    [COMMENT]: string,
    [IMAGES]: File[] | null,
}

export interface IReviewForm {
    isUserAuth?: boolean;
    isOpen: boolean;
    formValues: IValues;
    closeModal: () => void;
    setFormValues: React.Dispatch<React.SetStateAction<IValues>>
    startAuth?: () => void;
}
