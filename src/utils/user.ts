export const isVerifiedUser = (user?: {
  address?: string | null;
  username?: string | null;
}): boolean => !!user?.address && !!user.username;
