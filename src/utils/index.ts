/**
 * A function that adds nigerian country code to a phone number
 * @param phoneNumber
 * @returns formatted phone number '+234xxxxxxxx'
 */
export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length === 11 && phoneNumber[0] === "0") {
    return `+234${phoneNumber.slice(1, phoneNumber.length)}`;
  }
  return phoneNumber;
}

/*
generate password for a newly added admin
*/
export function newPassword() {
  var length = 8,
    charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

/**
 * A utility fn to get the current date and time for DB storage
 * @returns Current timestamp
 */
export function now() {
  return new Date().toISOString();
}

/**
 * A function that takes a phrase and returns camelCase
 * @param text text string
 * @returns camel case string
 */
export function camelCase(text: string) {
  const splitText = text.split(" ");

  if (splitText.length === 1) {
    return text.toLowerCase();
  }
  const newText = splitText.map((text, index) => {
    if (index === 0) {
      return text.toLowerCase();
    }
    const combined = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    return combined;
  });

  return newText.join("");
}
