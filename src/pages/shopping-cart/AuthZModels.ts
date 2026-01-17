export const AuthZStatusType = {
    SUCCESS: 'success',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    UNKNOWN: 'unknown'
} as const;

export type AuthZStatusType = typeof AuthZStatusType[keyof typeof AuthZStatusType];