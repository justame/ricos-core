import type {
  EditorPluginConfig,
  ViewerPluginConfig,
  PDFSettings,
  RichContentTheme,
  Helpers,
  TranslationFunction,
  FileComponentData,
  Pubsub,
} from 'wix-rich-content-common';
import type { PDF_STATUS } from './pdfViewer';

export const FILE_UPLOAD_TYPE = 'wix-draft-plugin-file-upload';

export interface FilePluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface FilePluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface PDFConfig {
  clientId: string;
  locale?: string;
}

export interface PDFViewerProps {
  status: PDF_STATUS;
  setStatus: (status: PDF_STATUS) => void;
  fileData: Record<string, string>;
  config: PDFConfig;
  pdfSettings: PDFSettings;
}

export type FileUploadSettingsState = {
  pdfView: string;
  showPrintPDF: boolean;
  showDownloadPDF: boolean;
};

export type FileUploadSettingsProps = {
  theme: RichContentTheme;
  isMobile?: boolean;
  helpers: Helpers;
  t: TranslationFunction;
  componentData: FileComponentData;
  pubsub: Pubsub;
  onSave: () => void;
  onCancel: () => void;
  updateData: (data: Record<string, string | boolean | PDFSettings>) => void;
  languageDir: string;
};
