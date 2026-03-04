// src/renderer/api/updater.ts
// Updater API – frontend client para sa Electron auto‑updater

// ----------------------------------------------------------------------
// 📦 Types & Interfaces
// ----------------------------------------------------------------------

export interface UpdateInfo {
  version: string;
  files: Array<{ url: string; sha512: string; size: number }>;
  path: string;
  sha512: string;
  releaseDate: string;
  releaseName?: string;
  releaseNotes?: string;
}

export interface DownloadProgress {
  bytesPerSecond: number;
  percent: number;
  total: number;
  transferred: number;
}

// ----------------------------------------------------------------------
// 📨 Response Interfaces
// ----------------------------------------------------------------------

export interface UpdateCheckResponse {
  status: boolean;
  message: string;
  data: UpdateInfo | null;
}

export interface DownloadResponse {
  status: boolean;
  message: string;
  data: null;
}

export interface InstallResponse {
  status: boolean;
  message: string;
  data: null;
}

export interface UpdateStatusResponse {
  status: boolean;
  message: string;
  data: {
    currentVersion: string;
    isUpdateAvailable: boolean;
  };
}

// ----------------------------------------------------------------------
// 🧠 UpdaterAPI Class
// ----------------------------------------------------------------------

class UpdaterAPI {
  // --------------------------------------------------------------------
  // 🚀 PUBLIC METHODS (IPC invoke)
  // --------------------------------------------------------------------

  /**
   * Manually check for updates
   */
  async checkForUpdates(): Promise<UpdateCheckResponse> {
    try {
      if (!window.backendAPI?.updater) {
        throw new Error('Updater API not available');
      }
      const response = await window.backendAPI.updater({
        method: 'checkForUpdates',
        params: {},
      });
      console.log(response)
      if (response.status) return response;
      throw new Error(response.message || 'Failed to check for updates');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to check for updates');
    }
  }

  /**
   * Start downloading the update (must be called after update is available)
   */
  async downloadUpdate(): Promise<DownloadResponse> {
    try {
      if (!window.backendAPI?.updater) {
        throw new Error('Updater API not available');
      }
      const response = await window.backendAPI.updater({
        method: 'downloadUpdate',
        params: {},
      });
      console.log(response)
      if (response.status) return response;
      throw new Error(response.message || 'Failed to download update');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to download update');
    }
  }

  /**
   * Quit the app and install the downloaded update
   */
  async quitAndInstall(): Promise<InstallResponse> {
    try {
      if (!window.backendAPI?.updater) {
        throw new Error('Updater API not available');
      }
      const response = await window.backendAPI.updater({
        method: 'quitAndInstall',
        params: {},
      });
      console.log(response)
      if (response.status) return response;
      throw new Error(response.message || 'Failed to install update');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to install update');
    }
  }

  /**
   * Get current version and update status
   */
  async getUpdateStatus(): Promise<UpdateStatusResponse> {
    try {
      if (!window.backendAPI?.updater) {
        throw new Error('Updater API not available');
      }
      const response = await window.backendAPI.updater({
        method: 'getUpdateStatus',
        params: {},
      });
      console.log(response)
      if (response.status) return response;
      throw new Error(response.message || 'Failed to get update status');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get update status');
    }
  }

  // --------------------------------------------------------------------
  // 🎧 EVENT LISTENERS (gamit ang generic `backendAPI.on`)
  // --------------------------------------------------------------------

  /**
   * Listen for "checking for updates" event
   */
  onChecking(callback: () => void): () => void {
    return window.backendAPI.on('updater:checking', callback);
  }

  /**
   * Listen for update available event
   */
  onUpdateAvailable(callback: (info: UpdateInfo) => void): () => void {
    return window.backendAPI.on('updater:update-available', (event, info) => callback(info));
  }

  /**
   * Listen for update not available event
   */
  onUpdateNotAvailable(callback: (info: UpdateInfo) => void): () => void {
    return window.backendAPI.on('updater:update-not-available', (event, info) => callback(info));
  }

  /**
   * Listen for download progress
   */
  onDownloadProgress(callback: (progress: DownloadProgress) => void): () => void {
    return window.backendAPI.on('updater:download-progress', (event, progress) => callback(progress));
  }

  /**
   * Listen for update downloaded (ready to install)
   */
  onUpdateDownloaded(callback: (info: UpdateInfo) => void): () => void {
    return window.backendAPI.on('updater:update-downloaded', (event, info) => callback(info));
  }

  /**
   * Listen for errors
   */
  onError(callback: (errorMessage: string) => void): () => void {
    return window.backendAPI.on('updater:error', (event, message) => callback(message));
  }

  // --------------------------------------------------------------------
  // 🧰 UTILITY
  // --------------------------------------------------------------------

  /**
   * Check if updater API is available
   */
  async isAvailable(): Promise<boolean> {
    return !!window.backendAPI?.updater;
  }
}

// ----------------------------------------------------------------------
// 📤 Export singleton instance
// ----------------------------------------------------------------------

const updaterAPI = new UpdaterAPI();
export default updaterAPI;