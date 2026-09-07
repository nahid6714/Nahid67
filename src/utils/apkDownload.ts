/**
 * Starts a direct APK download from the URL stored in the local app registry.
 * No GitHub API request is made here.
 */
export function triggerDirectApkDownload(downloadUrl: string, fileName: string): boolean {
  try {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to trigger direct APK download:', err);
    window.location.href = downloadUrl;
    return false;
  }
}
