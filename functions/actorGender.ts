export function actorGender(gender: number): string {
  if (gender == 0) {
    return "Not set / not specified";
  } else if (gender == 1) {
    return "Female";
  } else if (gender == 2) {
    return "Male";
  } else if (gender == 3) {
    return "Non-binary";
  } else {
    return "can't get actor gender";
  }
}

export const url = process.env.USER_BACKEND_URL || "";
