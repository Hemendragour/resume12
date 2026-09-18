/**
 * Converts a base64-encoded audio payload (as returned inline by the
 * backend alongside question text) into a Blob the browser can play.
 */
export const base64ToAudioBlob = (base64: string, mimeType: string): Blob => {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);

  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
};
