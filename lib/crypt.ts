import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";

export const encrypt = (text: string) => {
  return Base64.stringify(Utf8.parse(text));
};

export const decrypt = (data: string) => {
  return Base64.parse(data).toString(Utf8);
};
