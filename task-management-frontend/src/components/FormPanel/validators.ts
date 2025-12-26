export type Validators = {
  required?: boolean;
  dependsOn?: string; // Will be required if a certain other field is true
  equalTo?: {
    fieldName: string;
    error: string;
  }; // To check if a field is equal to another field
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isInteger?: boolean;
  isDecimal?: boolean;
  nonZero?: boolean;
  isPincode?: boolean;
  isValidUrl?: boolean;
  isCity?: boolean;
  isPhoneNumber?: boolean;
  isCountryCode?: boolean;
  maxValue?: number;
  minValue?: number;
  isAlphaNumeric?: boolean;
};

export default function validate(validators: Validators, formState: any, value: any) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/;
  const integerRegex = /^\d+$/;
  const decimalRegex = /^\d+.?\d+$/;
  const pincodeRegex = /^[A-Za-z0-9\s-]{3,10}$/;
  const cityRegex = /^[a-zA-Z& ]+/;
  const phoneNumberRegex = /^\d{6,14}$/;
  const countryCodeRegex = /^\+\d{1,3}$/;
  const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;
  const urlRegex = new RegExp(
    '^' +
      // protocol identifier (optional)
      // short syntax // still required
      '(?:(?:(?:https?|ftp):)?\\/\\/)' +
      // user:pass BasicAuth (optional)
      '(?:\\S+(?::\\S*)?@)?' +
      '(?:' +
      // IP address exclusion
      // private & local networks
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
      '|' +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      '(?:' +
      '(?:' +
      '[a-z0-9\\u00a1-\\uffff]' +
      '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
      ')?' +
      '[a-z0-9\\u00a1-\\uffff]\\.' +
      ')+' +
      // TLD identifier name, may end with dot
      '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
      ')' +
      // port number (optional)
      '(?::\\d{2,5})?' +
      // resource path (optional)
      '(?:[/?#]\\S*)?' +
      '$',
    'i'
  );

  switch (true) {
    case !!validators.nonZero && value === 0:
      return `This value cannot be zero.`;
    case validators.maxValue !== undefined && value > validators.maxValue:
      return `This value cannot be greater than ${validators.maxValue}.`;
    case validators.minValue !== undefined && value < validators.minValue:
      return `This value cannot be less than ${validators.minValue}.`;
    case !!validators.required && (typeof value === 'number' ? false : !value):
      return 'This field is required.';
    case !!validators.required && Array.isArray(value) && value.length === 0:
      return 'This field is required.';
    case !!validators.dependsOn && formState.data[validators.dependsOn] && !value:
      // Example: If dependsOn: "status", and value of field "status" is true then THIS field becomes required.
      return 'This field is required.';
    case !!validators.equalTo &&
      formState.data[validators.equalTo.fieldName] &&
      value !== formState.data[validators.equalTo.fieldName]:
      // Example: If equalTo: "status", and value of field "status" does not match then THIS field needs to be corrected.
      return validators.equalTo?.error;
    case !!validators.minLength && value && value.length < validators.minLength:
      return `Too short. Must be a minimum of ${validators.minLength} characters.`;
    case !!validators.maxLength && value && value.length > validators.maxLength:
      return `Too long. Must be a maximum of ${validators.maxLength} characters.`;
    case !!validators.isEmail && !emailRegex.test(value):
      return `Please enter a valid email ID. Example: test@yourCompany.com`;
    case !!validators.isInteger && !integerRegex.test(value):
      return 'Please enter a valid whole number. Decimals are not allowed.';
    case !!validators.isDecimal && !decimalRegex.test(value):
      return 'Please enter a valid number or decimal value.';
    case !!validators.isPincode && !pincodeRegex.test(value):
      return `Must be a valid Pincode. Example 560001`;
    case !!validators.isValidUrl && value !== null && !urlRegex.test(value):
      return `Must be a valid URL. Example https://xyz.com/path-to-image/image.png`;
    case !!validators.isCity && !cityRegex.test(value):
      return `Please enter a valid city name. Must not contain special characters.`;
    case !!validators.isPhoneNumber && !phoneNumberRegex.test(value):
      return `Please enter a valid phone number.`;
    case !!validators.isCountryCode && !countryCodeRegex.test(value):
      return `Please enter a valid country code.`;
    case !!validators.isAlphaNumeric && !alphaNumericRegex.test(value):
      return `Please enter a valid value. Special characters are not allowed.`;
    default:
      return null;
  }
}
