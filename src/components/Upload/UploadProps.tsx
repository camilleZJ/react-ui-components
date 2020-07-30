export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  /** 上传文件的唯一标识 */
  uid: string;
  /** 上传文件的尺寸 */
  size: number;
  /** 上传文件的名字 */
  name: string;
  /** 上传文件所处状态 */
  status?: UploadFileStatus;
  /** 文件上传进度 */
  percent?: number;
  /** 上传的文件 */
  raw?: File;
  /** 上传成功的响应 */
  response?: any;
  /** 上传失败的错误信息 */
  error?: any;
}

export interface UploadProps {
  /** 必选参数, 上传的地址 */
  action: string;
  /** 上传的文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件上传时的钩子:上传进度回调 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /** 文件状态改变时的钩子，上传成功或者失败时都会被调用 */
  onChange?: (file: UploadFile) => void;
  /** 文件上传时的钩子:上传成功回调 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /** 文件上传时的钩子：上传失败回调 */
  onError?: (error: any, file: UploadFile) => void;
  /** 文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /** 设置上传的请求头部 */
  headers?: { [key: string]: any };
  /** 上传的文件名 */
  name?: string;
  /** 上传时附带的额外参数 */
  data?: { [key: string]: any };
  /** 支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
}

export interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}
