let XMLHttpRequestOriginal = XMLHttpRequest;

declare module 'xmlhttprequest' {
  class XMLHttpRequest extends XMLHttpRequestOriginal {}
}
