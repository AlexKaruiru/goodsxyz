// react-phone-input-2 (used with country={'ke'}) pre-fills its controlled value with the
// country calling code ("+254") the moment it mounts, even if the visitor never types a single
// digit - so a plain truthiness check on the phone field always passes. This checks there are
// enough actual digits for a real phone number, not just a country-code prefix.
export const hasValidPhoneDigits = (phone) => {
  const digits = (phone || '').replace(/\D/g, '')
  return digits.length >= 10
}
