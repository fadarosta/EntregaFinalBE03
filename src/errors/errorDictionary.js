export const EErrors = {
    INVALID_TYPES_ERROR: 1,
    DATABASE_ERROR: 2,
    MISSING_FIELDS_ERROR: 3,
    UNAUTHORIZED_ERROR: 4,
    NOT_FOUND_ERROR: 5,
    DUPLICATE_KEY_ERROR: 6
};

export const errorDictionary = {
    [EErrors.INVALID_TYPES_ERROR]: 'Invalid types error',
    [EErrors.DATABASE_ERROR]: 'Database error',
    [EErrors.MISSING_FIELDS_ERROR]: 'Missing fields error',
    [EErrors.UNAUTHORIZED_ERROR]: 'Unauthorized access',
    [EErrors.NOT_FOUND_ERROR]: 'Resource not found',
    [EErrors.DUPLICATE_KEY_ERROR]: 'Duplicate key error'
};